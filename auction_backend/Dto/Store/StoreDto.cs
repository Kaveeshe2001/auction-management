using auction_backend.Dto.Art;

namespace auction_backend.Dto.Store
{
    public class StoreDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string CoverPhoto { get; set; } = string.Empty;
        public string ProfilePhoto { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public string UserId { get; set; } = string.Empty;
        public List<ArtDto> Arts { get; set; }
    }
}
