using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DersNotlariYonetimSistemi.API.Data;
using DersNotlariYonetimSistemi.API.Models;

namespace DersNotlariYonetimSistemi.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NotesController(AppDbContext context)
        {
            _context = context;
        }

        // Notları Listele
        [HttpGet]
        public async Task<IActionResult> GetNotes()
        {
            var notes = await _context.Notes
                .Where(n => n.DeletedAt == null)
                .ToListAsync();

            return Ok(notes);
        }

        // Not Ekle
        [HttpPost]
        public async Task<IActionResult> AddNote(Note note)
        {
            note.CreatedAt = DateTime.Now;
            note.UpdatedAt = DateTime.Now;

            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return Ok(note);
        }

        // Not Güncelle
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNote(int id, Note updatedNote)
        {
            var note = await _context.Notes.FindAsync(id);

            if (note == null)
                return NotFound();

            note.CourseName = updatedNote.CourseName;
            note.Description = updatedNote.Description;
            note.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(note);
        }

        // Soft Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            var note = await _context.Notes.FindAsync(id);

            if (note == null)
                return NotFound();

            note.DeletedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok();
        }

        // Arşiv
        [HttpGet("archive")]
        public async Task<IActionResult> GetArchive()
        {
            var notes = await _context.Notes
                .Where(n => n.DeletedAt != null)
                .ToListAsync();

            return Ok(notes);
        }

        // Hard Delete
        [HttpDelete("hard/{id}")]
        public async Task<IActionResult> HardDelete(int id)
        {
            var note = await _context.Notes.FindAsync(id);

            if (note == null)
                return NotFound();

            _context.Notes.Remove(note);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}