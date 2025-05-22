using Microsoft.EntityFrameworkCore;

namespace xpto_back.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
            
        }

        public DbSet<Debts> Dividas { get; set; }
    }
}
