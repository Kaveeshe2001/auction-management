namespace auction_backend.Dto.Art
{
    public class ArtDto
    {
        public int Id { get; set; }
        public string Lot { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public decimal CurrentMarketPrice { get; set; }
        public string Condition { get; set; } = string.Empty;
        public bool isFramed { get; set; }
        public decimal Height { get; set; }
        public decimal Width { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int CategoryId { get; set; }
        public int StoreId { get; set; }
    }
}
