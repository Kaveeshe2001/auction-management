using System.ComponentModel.DataAnnotations;

namespace auction_backend.Dto.Category
{
    public class UpdateCategoryDto
    {
        [Required]
        public string CategoryName { get; set; }

        [Required]
        public string Image { get; set; }

        [Required]
        public string Icon { get; set; }
    }
}
