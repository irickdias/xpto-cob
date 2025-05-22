using xpto_back.Data;
using xpto_back.Interfaces;

namespace xpto_back.Repository
{
    public class DebtRepository : IDebtRepository
    {
        private readonly ApplicationDBContext _context;

        public DebtRepository(ApplicationDBContext context)
        {
            _context = context;
        }
    }
}
