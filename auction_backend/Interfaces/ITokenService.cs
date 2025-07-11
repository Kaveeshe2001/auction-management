using auction_backend.Models;

namespace auction_backend.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
