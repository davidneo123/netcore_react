using Microsoft.EntityFrameworkCore;
using students.infrastructure.Dao;

namespace students.infrastructure.DataAccess
{
    public class AppDbContext : DbContext
    {
        public DbSet<StudentDao> Student { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public AppDbContext(DbContextOptions options) : base(options) { }

        public AppDbContext()
        {

        }
    }
}