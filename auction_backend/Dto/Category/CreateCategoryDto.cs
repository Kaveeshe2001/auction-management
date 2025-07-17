using System.ComponentModel.DataAnnotations;

namespace auction_backend.Dto.Category
{
    public class CreateCategoryDto
    {
        [Required]
        public string CategoryName { get; set; } = string.Empty;
        [Required]
        public string Image { get; set; } = string.Empty;
        [Required]
        public string Icon { get; set; } = string.Empty;
    }
}
