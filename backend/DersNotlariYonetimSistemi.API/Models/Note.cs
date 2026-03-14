using System;
using System.ComponentModel.DataAnnotations;

namespace DersNotlariYonetimSistemi.API.Models
{
    public class Note
    {
        public int Id { get; set; }

        [Required]
        public string CourseName { get; set; } = null!; // boş olamaz

        [Required]
        public string Description { get; set; } = null!;

        public string? FilePath { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? DeletedAt { get; set; }
    }
}