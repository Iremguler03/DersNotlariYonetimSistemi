using Microsoft.AspNetCore.Mvc;
<<<<<<< HEAD
=======
using Microsoft.EntityFrameworkCore;
>>>>>>> c8bbbbb (deneme5)
using DersNotlariYonetimSistemi.API.Data;
using DersNotlariYonetimSistemi.API.Models;

namespace DersNotlariYonetimSistemi.API.Controllers
{
    [ApiController]
<<<<<<< HEAD
    [Route("api/notes")]
=======
    [Route("api/[controller]")]
>>>>>>> c8bbbbb (deneme5)
    public class NotesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NotesController(AppDbContext context)
        {
            _context = context;
        }

<<<<<<< HEAD
        [HttpGet]
        public IActionResult GetNotes()
        {
            var notes = _context.Notes
                .Where(n => n.DeletedAt == null)
                .ToList();
=======
        // Notları Listele
        [HttpGet]
        public async Task<IActionResult> GetNotes()
        {
            var notes = await _context.Notes
                .Where(n => n.DeletedAt == null)
                .ToListAsync();
>>>>>>> c8bbbbb (deneme5)

            return Ok(notes);
        }

<<<<<<< HEAD
        [HttpPost]
        public IActionResult AddNote(Note note)
=======
        // Not Ekle
        [HttpPost]
        public async Task<IActionResult> AddNote(Note note)
>>>>>>> c8bbbbb (deneme5)
        {
            note.CreatedAt = DateTime.Now;
            note.UpdatedAt = DateTime.Now;

            _context.Notes.Add(note);
<<<<<<< HEAD
            _context.SaveChanges();
=======
            await _context.SaveChangesAsync();
>>>>>>> c8bbbbb (deneme5)

            return Ok(note);
        }

<<<<<<< HEAD
        [HttpDelete("{id}")]
        public IActionResult DeleteNote(int id)
        {
            var note = _context.Notes.Find(id);

            note.DeletedAt = DateTime.Now;

            _context.SaveChanges();
=======
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
>>>>>>> c8bbbbb (deneme5)

            return Ok();
        }
    }
}