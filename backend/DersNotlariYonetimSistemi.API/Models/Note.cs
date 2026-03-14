using System.ComponentModel.DataAnnotations;

namespace DersNotlariYonetimSistemi.API.Models
{
    public class Note
    {
        public int Id { get; set; }

        [Required]
        public string CourseName { get; set; }

        public string? Description { get; set; }

        public string? FilePath { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? DeletedAt { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }
    }
}