using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update;
using xpto_back.Helpers;
using xpto_back.Interfaces;
using xpto_back.Models;

namespace xpto_back.Controllers
{
    [Route("xpto/debt")]
    [ApiController]
    public class DebtController : ControllerBase
    {
        private readonly IDebtRepository _repo;

        public DebtController(IDebtRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            var debts = await _repo.GetAll(query);

            return Ok(debts);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadCsv(IFormFile file)
        {
            // Console.WriteLine($"Arquivo recebido: {file?.FileName}, Tamanho: {file?.Length}");
            var uploadTotal = await _repo.UploadCsv(file);

            if(uploadTotal == 0)
                BadRequest("Nenhum arquivo enviado.");

            return Ok(new { message = $"Importação concluída com sucesso. Total: {uploadTotal}" });
        }

        [HttpPost("import-from-folder")]
        public async Task<IActionResult> ImportFromFolder()
        {
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "ServerSimulator", "DebtsCSV");

            // verifica existencia da pasta
            if (!Directory.Exists(folderPath))
                return NotFound("Pasta 'DebtsCSV' não encontrada!");

            // verifica existencia de arquivo csv
            var csvFiles = Directory.GetFiles(folderPath, "*.csv");
            if (csvFiles.Length == 0)
                return NotFound("Nenhum arquivo csv encontrado na pasta 'DebtsCSV'");

            var filePath = csvFiles[0];

            // le o arquivo e transforma para FormFile
            await using var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            var formFile = new FormFile(stream, 0, stream.Length, "file", Path.GetFileName(filePath));

            // realiza a importacao
            var result = await _repo.UploadCsv(formFile);

            if (result == 0)
                return BadRequest("Falha na importação do arquivo");

            return Ok($"Importação realizada com sucesso a partir do arquivo: {Path.GetFileName(filePath)}");
        }

        [HttpGet]
        [Route("update-debts")]
        public async Task<IActionResult> UpdateDebts()
        {
            var updatedTotal = await _repo.UpdateDebts();

            if (updatedTotal == 0)
                BadRequest("Não foi possível atualizar as dívidas");

            return Ok(new { message = $"Atualizações concluídas com sucesso. Total: {updatedTotal}" });
        }

        [HttpGet]
        [Route("export")]
        public async Task<IActionResult> ExportDebts()
        {
            var csv_bytes = await _repo.ExportDebts();

            var filename = $"Divida-Atualizada-{DateTime.Now:dd-MM-yyyy}.csv";

            return File(csv_bytes, "text/csv", filename);
        }

    }
}
