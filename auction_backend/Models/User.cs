using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace auction_backend.Models
{
    [Table("ApplicationUser")]
    public class User: IdentityUser
    {
    }
}
