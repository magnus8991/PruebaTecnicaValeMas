using Entidad;
using Microsoft.EntityFrameworkCore;

namespace Datos
{
    public class PruebaTecnicaContext : DbContext
    {
        public PruebaTecnicaContext(DbContextOptions options) : base(options) { }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(u => u.UserName);
            
        }
    }
}
