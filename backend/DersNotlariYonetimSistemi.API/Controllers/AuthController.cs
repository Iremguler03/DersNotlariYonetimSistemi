using Microsoft.AspNetCore.Mvc;
using DersNotlariYonetimSistemi.API.Data;
using DersNotlariYonetimSistemi.API.Models;
using DersNotlariYonetimSistemi.API.DTOs;
using DersNotlariYonetimSistemi.API.Helpers;

namespace DersNotlariYonetimSistemi.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtService _jwt;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _jwt = new JwtService(configuration);
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDTO dto)
        {
            var user = new User
            {
                Username = dto.Username,
                Password = dto.Password
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(user);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDTO dto)
        {
            var user = _context.Users.FirstOrDefault(x => x.Username == dto.Username);

            if (user == null || user.Password != dto.Password)
                return BadRequest("Invalid credentials");

            var token = _jwt.GenerateToken(user);

            return Ok(new { token });
        }
    }
}