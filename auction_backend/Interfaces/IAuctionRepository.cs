using auction_backend.Helpers;
using auction_backend.Models;

namespace auction_backend.Interfaces
{
    public interface IAuctionRepository
    {
        Task<List<Auction>> GetAllAsync();
        Task<Auction?> GetByIdAsync(int id);
        Task<Auction?> UpdateAsync(int id, Auction auctionModel);
        Task<Auction> CreateAsync(Auction auctionModel);
        Task<Auction?> DeleteAsync(int id);
        Task<Auction?> GetByArtId(int id);
        Task CheckAndUpdateStatus(Auction auction);
        Task<List<Auction>> GetByUserAsync(string userId, QueryObject? queryObject = null);
        Task<List<Auction>> GetLatestAsync(int? limit = null);
    }
}
