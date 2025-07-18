using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace auction_backend.Models
{
    [Table("Store")]
    public class Store
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string PhoneNumber { get; set; } = string.Empty;
        [Required]
        public string Address { get; set; } = string.Empty;
        [Required]
        public string CoverPhoto { get; set; } = string.Empty;
        [Required]
        public string ProfilePhoto { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; } = string.Empty;
        public User User { get; set; }
        public List<Art> Arts { get; set; } = new List<Art>();
    }
}
