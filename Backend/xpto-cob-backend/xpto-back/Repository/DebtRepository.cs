using System.Net.Http.Headers;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using xpto_back.Data;
using xpto_back.Interfaces;
using xpto_back.Models;
using xpto_back.Models.DTOs;

namespace xpto_back.Repository
{
    public class DebtRepository : IDebtRepository
    {
        private readonly ApplicationDBContext _context;

        public DebtRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Debt>> GetAll()
        {
            return await _context.Debts.ToListAsync();
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

            Console.WriteLine(response);

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
                    isFirstLine = false; // pula o cabeçalho
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

            //// Etapa 2: salvar no banco
            //foreach (var debt in debtsToInsert)
            //{
            //    await _context.Debts.AddAsync(debt);
            //}

            await _context.SaveChangesAsync();
            return debtsToInsert.Count;
        }
    }
}
