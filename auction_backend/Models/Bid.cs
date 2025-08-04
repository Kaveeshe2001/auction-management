using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace auction_backend.Models
{
    [Table("Bid")]
    public class Bid
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; }
        [Required]
        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public User User { get; set; }
        [Required]
        [ForeignKey("Auction")]
        public int AuctionId { get; set; }
        public Auction Auction { get; set; }
        public string PaymentIntentId { get; set; }
        public DateTime BidDate { get; set; } = DateTime.Now;
        public bool IsPaymentCaptured { get; internal set; } = false;
    }
}
