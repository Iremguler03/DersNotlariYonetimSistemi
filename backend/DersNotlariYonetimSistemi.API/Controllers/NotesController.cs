using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DersNotlariYonetimSistemi.API.Data;
using DersNotlariYonetimSistemi.API.Models;
using Microsoft.AspNetCore.Authorization;

namespace DersNotlariYonetimSistemi.API.Controllers
{
    [ApiController]
    [Route("api/notes")]
    public class NotesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public NotesController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetNotes()
        {
            var notes = await _context.Notes
                .Where(n => n.DeletedAt == null)
                .ToListAsync();
            return Ok(notes);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddNote([FromForm] string CourseName,
                                                 [FromForm] string Description,
                                                 IFormFile? file)
        {
            try
            {
                var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                if (userIdClaim == null) return Unauthorized("UserId token’dan alınamadı");
                int userId = int.Parse(userIdClaim);

                string? filePath = null;
                if (file != null)
                {
                    var folder = Path.Combine("wwwroot/uploads");
                    if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

                    var uniqueFileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                    var fullPath = Path.Combine(folder, uniqueFileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                        await file.CopyToAsync(stream);

                    filePath = "/uploads/" + uniqueFileName;
                }

                var note = new Note
                {
                    CourseName = CourseName,
                    Description = Description,
                    FilePath = filePath,
                    UserId = userId,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Notes.Add(note);
                await _context.SaveChangesAsync();
                return Ok(note);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null) return NotFound();
            note.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}