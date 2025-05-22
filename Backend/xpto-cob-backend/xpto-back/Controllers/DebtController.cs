using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpPost("upload")]
        public async Task<IActionResult> UploadCsv(IFormFile file)
        {
            var uploadTotal = await _repo.UploadCsv(file);

            if(uploadTotal == 0)
                BadRequest("Nenhum arquivo enviado.");

            //return Ok(new { message = $"Importação concluída. Total de dívidas inseridas: {debtsToInsert.Count}" });
            return Ok(new { message = $"Importação concluída com sucesso. Total: {uploadTotal}" });
        }
    }
}
