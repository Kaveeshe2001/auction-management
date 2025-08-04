using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace auction_backend.Models
{
    [Table("Auction")]
    public class Auction
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Status { get; set; } = string.Empty;
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        [ForeignKey("Art")]
        public int ArtId { get; set; }
        public Art Art { get; set; }
        [Required]
        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; } = string.Empty;
        public User User { get; set; }
        public List<Bid> Bids { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
