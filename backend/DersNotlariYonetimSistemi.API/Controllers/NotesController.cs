using Microsoft.AspNetCore.Mvc;
using DersNotlariYonetimSistemi.API.Data;
using DersNotlariYonetimSistemi.API.Models;

namespace DersNotlariYonetimSistemi.API.Controllers
{
    [ApiController]
    [Route("api/notes")]
    public class NotesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NotesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetNotes()
        {
            var notes = _context.Notes
                .Where(n => n.DeletedAt == null)
                .ToList();

            return Ok(notes);
        }

        [HttpPost]
        public IActionResult AddNote(Note note)
        {
            note.CreatedAt = DateTime.Now;
            note.UpdatedAt = DateTime.Now;

            _context.Notes.Add(note);
            _context.SaveChanges();

            return Ok(note);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteNote(int id)
        {
            var note = _context.Notes.Find(id);

            note.DeletedAt = DateTime.Now;

            _context.SaveChanges();

            return Ok();
        }
    }
}