using System.ComponentModel.DataAnnotations;

namespace auction_backend.Dto.Auction
{
    public class UpdateAuctionDto
    {
        [Required]
        public string Status { get; set; } = string.Empty;
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; } = DateTime.MinValue;
        [Required]
        public int ArtId { get; set; }
    }
}
