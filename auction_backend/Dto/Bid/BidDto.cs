namespace auction_backend.Dto.Bid
{
    public class BidDto
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string UserId { get; set; } = string.Empty;
        public int AuctionId { get; set; }
        public string PaymentIntentId { get; set; } = string.Empty;
        public DateTime BidDate { get; set; } = DateTime.Now;
    }
}
