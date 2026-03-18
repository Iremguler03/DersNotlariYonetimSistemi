using Microsoft.AspNetCore.Mvc;
using DersNotlariYonetimSistemi.API.Data;
using DersNotlariYonetimSistemi.API.DTOs;
using DersNotlariYonetimSistemi.API.Helpers;
using DersNotlariYonetimSistemi.API.Models;
using BCrypt.Net;

namespace DersNotlariYonetimSistemi.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtService _jwtService;

        public AuthController(AppDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDTO dto)
        {
            var user = new User
            {
                Username = dto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(user);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDTO dto)
        {
            var user = _context.Users.FirstOrDefault(x => x.Username == dto.username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.password, user.PasswordHash))
                return BadRequest("Kullanıcı adı veya şifre yanlış");

            var token = _jwtService.GenerateToken(user);

            return Ok(new { token });
        }
    }
}