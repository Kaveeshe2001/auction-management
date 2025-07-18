using System.ComponentModel.DataAnnotations;

namespace auction_backend.Dto.Art
{
    public class CreateArtRequestDto
    {
        [Required]
        [MinLength(5, ErrorMessage = "Title must be 5 characters")]
        [MaxLength(280, ErrorMessage = "Title cannot be over 280 characters")]
        public string Title { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        [Required]
        public decimal CurrentMarketPrice { get; set; }
        [Required]
        public string Condition { get; set; } = string.Empty;
        [Required]
        public bool isFramed { get; set; }
        [Required]
        public decimal Height { get; set; }
        [Required]
        public decimal Width { get; set; }
        [Required]
        public int CategoryId { get; set; }
    }
}
