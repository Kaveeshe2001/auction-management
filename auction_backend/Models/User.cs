using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace auction_backend.Models
{
    [Table("ApplicationUser")]
    public class User: IdentityUser
    {
        public virtual Store Store { get; set; }
        public List<Art> Arts { get; set; } = new List<Art>();
    }
}
