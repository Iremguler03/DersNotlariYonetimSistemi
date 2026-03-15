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

        [HttpPut("{id}")]
        public IActionResult UpdateNote(int id, [FromForm] NoteDTO dto, IFormFile? file)
        {
            var userId = GetUserId();

            var note = _context.Notes
                .FirstOrDefault(n => n.Id == id && n.UserId == userId);

            if (note == null)
                return NotFound();

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

        [HttpPut("restore/{id}")]
        public IActionResult Restore(int id)
        {
            var userId = GetUserId();

            var note = _context.Notes
                .FirstOrDefault(n => n.Id == id && n.UserId == userId);

            if (note == null)
                return NotFound();

            note.DeletedAt = null;

            _context.SaveChanges();

            return Ok();
        }

        [HttpGet]
        public IActionResult GetNotes()
        {
            var userId = GetUserId();

            var notes = _context.Notes
                .Where(n => n.UserId == userId && n.DeletedAt == null)
                .ToList();

            return Ok(notes);
        }

        [HttpPost]
        public IActionResult AddNote([FromForm] NoteDTO dto, IFormFile file)
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
                UserId = userId
            };

            _context.Notes.Add(note);
            _context.SaveChanges();

            return Ok(note);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var note = _context.Notes.Find(id);

            if (note == null)
                return NotFound();

            note.DeletedAt = DateTime.UtcNow;

            _context.SaveChanges();

            return Ok();
        }

        [HttpGet("archive")]
        public IActionResult Archive()
        {
            var userId = GetUserId();

            var notes = _context.Notes
                .Where(n => n.UserId == userId && n.DeletedAt != null)
                .ToList();

            return Ok(notes);
        }

        [HttpDelete("hard/{id}")]
        public IActionResult HardDelete(int id)
        {
            var note = _context.Notes.Find(id);

            if (note == null)
                return NotFound();

            _context.Notes.Remove(note);
            _context.SaveChanges();

            return Ok();
        }
    }
}