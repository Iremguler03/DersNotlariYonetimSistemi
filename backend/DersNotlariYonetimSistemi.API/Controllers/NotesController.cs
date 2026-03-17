using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using DersNotlariYonetimSistemi.API.Data;
using DersNotlariYonetimSistemi.API.DTOs;
using DersNotlariYonetimSistemi.API.Models;

namespace DersNotlariYonetimSistemi.API.Controllers
{
    [ApiController]
    [Route("api/notes")]
    [Authorize]
    public class NotesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NotesController(AppDbContext context)
        {
            _context = context;
        }

        private int GetUserId()
        {
            return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        }

        // ✅ UPDATE (Sadece silinmemiş notlar)
        [HttpPut("{id}")]
        public IActionResult UpdateNote(int id, [FromForm] NoteDTO dto, IFormFile? file)
        {
            var userId = GetUserId();

            var note = _context.Notes
                .FirstOrDefault(n => n.Id == id && n.UserId == userId && n.DeletedAt == null);

            if (note == null)
                return BadRequest("Not bulunamadı veya silinmiş");

            note.CourseName = dto.CourseName;
            note.Description = dto.Description;
            note.UpdatedAt = DateTime.UtcNow;

            if (file != null)
            {
                var path = Path.Combine("wwwroot/uploads", file.FileName);

                using var stream = new FileStream(path, FileMode.Create);
                file.CopyTo(stream);

                note.FilePath = "/uploads/" + file.FileName;
            }

            _context.SaveChanges();

            return Ok(note);
        }

        // ✅ RESTORE (Arşivden geri yükle)
        [HttpPut("restore/{id}")]
        public IActionResult Restore(int id)
        {
            var userId = GetUserId();

            var note = _context.Notes
                .FirstOrDefault(n => n.Id == id && n.UserId == userId);

            if (note == null || note.DeletedAt == null)
                return NotFound("Not arşivde değil");

            note.DeletedAt = null;
            note.UpdatedAt = DateTime.UtcNow;

            _context.SaveChanges();

            return Ok("Not geri yüklendi");
        }

        // ✅ NORMAL NOTLAR
        [HttpGet]
        public IActionResult GetNotes()
        {
            var userId = GetUserId();

            var notes = _context.Notes
                .Where(n => n.UserId == userId && n.DeletedAt == null)
                .ToList();

            return Ok(notes);
        }

        // ✅ ARŞİV
        [HttpGet("archive")]
        public IActionResult Archive()
        {
            var userId = GetUserId();

            var notes = _context.Notes
                .Where(n => n.UserId == userId && n.DeletedAt != null)
                .ToList();

            return Ok(notes);
        }

        // ✅ ADD
        [HttpPost]
        public IActionResult AddNote([FromForm] NoteDTO dto, IFormFile? file)
        {
            var userId = GetUserId();

            string? filePath = null;

            if (file != null)
            {
                var path = Path.Combine("wwwroot/uploads", file.FileName);

                using var stream = new FileStream(path, FileMode.Create);
                file.CopyTo(stream);

                filePath = "/uploads/" + file.FileName;
            }

            var note = new Note
            {
                CourseName = dto.CourseName,
                Description = dto.Description,
                FilePath = filePath,
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Notes.Add(note);
            _context.SaveChanges();

            return Ok(note);
        }

        // ✅ SOFT DELETE (Arşive atar)
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var userId = GetUserId();

            var note = _context.Notes
                .FirstOrDefault(n => n.Id == id && n.UserId == userId && n.DeletedAt == null);

            if (note == null)
                return NotFound("Not bulunamadı");

            note.DeletedAt = DateTime.UtcNow;
            note.UpdatedAt = DateTime.UtcNow;

            _context.SaveChanges();

            return Ok("Not arşive taşındı");
        }

        // ✅ HARD DELETE (Kalıcı silme)
        [HttpDelete("hard/{id}")]
        public IActionResult HardDelete(int id)
        {
            var userId = GetUserId();

            var note = _context.Notes
                .FirstOrDefault(n => n.Id == id && n.UserId == userId && n.DeletedAt != null);

            if (note == null)
                return NotFound("Not arşivde değil");

            _context.Notes.Remove(note);
            _context.SaveChanges();

            return Ok("Kalıcı olarak silindi");
        }
    }
}