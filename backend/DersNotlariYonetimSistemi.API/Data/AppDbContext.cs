using Microsoft.EntityFrameworkCore;
using DersNotlariYonetimSistemi.API.Models;

namespace DersNotlariYonetimSistemi.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Note> Notes { get; set; }
    }
}