using Microsoft.EntityFrameworkCore;
using xpto_back.Models;

namespace xpto_back.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
            
        }

        public DbSet<Debt> Debts { get; set; }
    }
}
