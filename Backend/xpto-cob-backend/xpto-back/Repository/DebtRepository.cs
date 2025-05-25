using System.Diagnostics;
using System.Globalization;
using System.Net.Http.Headers;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using xpto_back.Data;
using xpto_back.Helpers;
using xpto_back.Interfaces;
using xpto_back.Models;
using xpto_back.Models.DTOs;
using xpto_back.Models.Mappers;

namespace xpto_back.Repository
{
    public class DebtRepository : IDebtRepository
    {
        private readonly ApplicationDBContext _context;

        public DebtRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<PaginatedList<DebtFormattedDto>> GetAll(QueryObject query)
        {
            var debtsQuery = _context.Debts.AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.customer))
                debtsQuery = debtsQuery.Where(d => d.CustomerName.Contains(query.customer));

            if (!string.IsNullOrWhiteSpace(query.contract))
                debtsQuery = debtsQuery.Where(d => d.ContractNumber.Equals(query.contract));

            if (!string.IsNullOrWhiteSpace(query.cpf))
                debtsQuery = debtsQuery.Where(d => d.Cpf.Equals(query.cpf));

            var debts = await debtsQuery.Select(d => d.ToDebtFormatedDto()).ToListAsync();

            var totalCount = debts.Count;
            var totalPages = (int)Math.Ceiling(totalCount / (double)query.pageSize);

            var skipNumber = (query.pageNumber - 1) * query.pageSize;
            var pagedDebts = debts.Skip(skipNumber).Take(query.pageSize).ToList();

            return new PaginatedList<DebtFormattedDto>
            {
                data = pagedDebts,
                totalPages = totalPages,
                totalRecords = totalCount
            };
        }

        public async Task<int> UpdateDebts()
        {
            var debts = await _context.Debts.ToListAsync();
            int updated = 0;

            foreach (var debt in debts)
            {
                var calc = await CallCalculationApi(debt);
                
                if (calc == null) // nao foi possivel realizar o calculo, ou ainda estava dentro do prazo
                    continue;

                debt.UpdatedAmount = calc.ValorAtualizado;
                debt.DiscountAmount = debt.OriginalAmount * (calc.DescontoMaximo / 100);
                debt.UpdateDate = DateTime.Now;
                updated++;
            }

            await _context.SaveChangesAsync();

            return updated;
        }

        private async Task<CalculationResponse?> CallCalculationApi(Debt debt)
        {
            int atraso = (DateTime.Now - debt.DueDate).Days;

            if (atraso < 0) // ainda está no prazo, entao nao faz requisicao
                return null;

            var obj = new CalculationRequest
            {
                TipoContrato = debt.ContractType,
                Valor = debt.OriginalAmount,
                Atraso = atraso
            };

            using var httpClient = new HttpClient();

            httpClient.DefaultRequestHeaders.CacheControl = CacheControlHeaderValue.Parse("no-cache");

            var json = JsonSerializer.Serialize(obj);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await httpClient.PostAsync(
                "https://api.cobmais.com.br/testedev/calculo?ver",
                content
            );

            // Console.WriteLine(response);

            if (!response.IsSuccessStatusCode) // nao foi possivel realizar o calculo, e retornou erro
                return null;

            return await response.Content.ReadFromJsonAsync<CalculationResponse>();
        }

        public async Task<int> UploadCsv(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return 0;

            var debtsToInsert = new List<Debt>();

            using var streamReader = new StreamReader(file.OpenReadStream());
            string? line;
            bool isFirstLine = true;

            while ((line = await streamReader.ReadLineAsync()) != null)
            {
                if (isFirstLine)
                {
                    isFirstLine = false; // pula o cabecalho
                    continue;
                }

                var parts = line.Split(';');
                if (parts.Length != 6) continue;

                var cpf = parts[0].Trim();
                var customer = parts[1].Trim();
                var contract = parts[2].Trim();
                var dueDateStr = parts[3].Trim();
                var amountStr = parts[4].Trim().Replace(",", ".");
                var contractType = parts[5].Trim();

                if (!DateTime.TryParse(dueDateStr, out var dueDate)) continue;
                if (!decimal.TryParse(amountStr, out var amount)) continue;

                var debt = new Debt
                {
                    Cpf = cpf,
                    CustomerName = customer,
                    ContractNumber = contract,
                    DueDate = dueDate,
                    OriginalAmount = amount,
                    ContractType = contractType
                };

                debtsToInsert.Add(debt);
            }

            await _context.Debts.AddRangeAsync(debtsToInsert);

            await _context.SaveChangesAsync();
            return debtsToInsert.Count;
        }

        public async Task<byte[]> ExportDebts()
        {
            var debts = await _context.Debts.ToListAsync();

            // cria a string dos valores separadas por ;
            var csv = new StringBuilder();
            csv.AppendLine("CPF;ATUALIZACAO_DATA;CONTRATO;VALOR_ORIGINAL;VALOR_ATUALIZADO;VALOR_DESCONTO");

            var culture = new CultureInfo("pt-BR");

            foreach (var debt in debts)
            {
                csv.AppendLine($"{debt.Cpf};{debt.UpdateDate:dd/MM/yyyy};{debt.ContractNumber};{debt.OriginalAmount.ToString("N2", culture)};{debt.UpdatedAmount?.ToString("N2", culture)};{debt.DiscountAmount?.ToString("N2", culture)}");
            }

            var content = csv.ToString();
            var bytes = Encoding.UTF8.GetBytes(content);

            // verifica a existencia da pasta destino, criando senao existir
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "ServerSimulator", "UpdatedDebtsCSV");
            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            // salava o csv atualizado nesta pasta
            var fileName = $"Divida-Atualizada-{DateTime.Now:dd-MM-yyyy}.csv";
            var filePath = Path.Combine(folderPath, fileName);
            await File.WriteAllTextAsync(filePath, content, Encoding.UTF8);

            return bytes;
        }
    }
}
