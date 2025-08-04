using auction_backend.Models;

namespace auction_backend.Interfaces
{
    public interface IBidRepository
    {
        Task<List<Bid>> GetAllAsync();
        Task<List<Bid>> GetByAuctionAsync(int id);
        Task<List<Bid>> GetByUserAsync(string userId);
        Task<Bid> PlaceBidAsync(Bid bidModel);
    }
}
