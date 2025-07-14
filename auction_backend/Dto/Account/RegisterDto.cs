using System.ComponentModel.DataAnnotations;

namespace auction_backend.Dto.Account
{
    public class RegisterDto
    {
        [Required]
        public string? Username { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        [Phone]
        public string? PhoneNumber { get; set; }
    }
}
