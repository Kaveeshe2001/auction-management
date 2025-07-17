using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace auction_backend.Models
{
    [Table("Category")]
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string CategoryName { get; set; } = string.Empty;
        [Required]
        public string Image { get; set; } = string.Empty ;
        [Required]
        public string Icon { get; set; } = string.Empty ;
    }
}
