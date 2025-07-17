using System.ComponentModel.DataAnnotations;

namespace auction_backend.Dto.Category
{
    public class UpdateCategoryDto
    {
        [Required]
        public string CategoryName = string.Empty;
        [Required]
        public string Image = string.Empty;
        [Required]
        public string Icon = string.Empty;
    }
}
