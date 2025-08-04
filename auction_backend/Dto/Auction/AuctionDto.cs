namespace auction_backend.Dto.Auction
{
    public class AuctionDto
    {
        public int Id { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; } = DateTime.MinValue;
        public int ArtId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
