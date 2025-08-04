namespace auction_backend.Dto.Bid
{
    public class CapturePaymentDto
    {
        public string PaymentIntentId { get; set; } = string.Empty;
        public int AuctionId { get; set; }
        public string UserId { get; set; } = string.Empty;
    }
}
