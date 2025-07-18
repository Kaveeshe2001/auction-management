using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace auction_backend.Models
{
    [Table("Art")]
    public class Art
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Lot { get; set; } = string.Empty;
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Image { get; set; } = string.Empty;
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal CurrentMarketPrice { get; set; }
        [Required]
        public string Condition {  get; set; } = string.Empty;
        [Required]
        public bool isFramed { get; set; }
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Height { get; set; }
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Width { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        [Required]
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
