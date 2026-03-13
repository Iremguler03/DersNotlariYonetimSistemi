using DersNotlariYonetimSistemi.API.Models;
using DersNotlariYonetimSistemi.API.Data;

namespace DersNotlariYonetimSistemi.API.Seeder
{
    public class DataSeeder
    {
        public static void Seed(AppDbContext context)
        {
            if (!context.Users.Any())
            {
                context.Users.Add(new User
                {
                    Username = "admin",
                    Password = "1234"
                });

                context.SaveChanges();
            }
        }
    }
}