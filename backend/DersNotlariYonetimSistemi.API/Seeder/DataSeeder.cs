using DersNotlariYonetimSistemi.API.Models;
using DersNotlariYonetimSistemi.API.Data;

namespace DersNotlariYonetimSistemi.API.Seeder
{
    public static class DataSeeder
    {
        public static void Seed(AppDbContext context)
        {
            if (!context.Users.Any())
            {
                var user = new User
                {
                    Username = "admin",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456")
                };

                context.Users.Add(user);
                context.SaveChanges();
            }
        }
    }
}