using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update;
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
        [Route("/")]
        public async Task<IActionResult> GetAll()
        {
            var debts = await _repo.GetAll();

            return Ok(debts);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadCsv(IFormFile file)
        {
            // Console.WriteLine($"Arquivo recebido: {file?.FileName}, Tamanho: {file?.Length}");
            var uploadTotal = await _repo.UploadCsv(file);

            if(uploadTotal == 0)
                BadRequest("Nenhum arquivo enviado.");

            //return Ok(new { message = $"Importação concluída. Total de dívidas inseridas: {debtsToInsert.Count}" });
            return Ok(new { message = $"Importação concluída com sucesso. Total: {uploadTotal}" });
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
