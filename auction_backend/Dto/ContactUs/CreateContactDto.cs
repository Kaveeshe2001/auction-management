using System.ComponentModel.DataAnnotations;

namespace auction_backend.Dto.ContactUs
{
    public class CreateContactDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
    }
}
