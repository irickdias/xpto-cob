using Microsoft.AspNetCore.Mvc;
using xpto_back.Interfaces;

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
    }
}
