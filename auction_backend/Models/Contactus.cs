using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace auction_backend.Models
{
    [Table("Contact")]
    public class Contactus
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Subject { get; set; } = string.Empty;
        public string Messgae { get; set; } = string.Empty;
    }
}
