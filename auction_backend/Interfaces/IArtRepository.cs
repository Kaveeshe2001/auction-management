using auction_backend.Models;
using auction_backend.Helpers;

namespace auction_backend.Interfaces
{
    public interface IArtRepository
    {
        Task<List<Art>> GetAllAsync();
        Task<Art?> GetByIdAsync(int id);
        Task<List<Art?>> GetByCategoryAsync(int id);
        Task<List<Art?>> GetByStoreAsync(int id, QueryObject? query = null);
        Task<Art?> UpdateAsync(int id, Art artModel);
        Task<Art> CreateAsync(Art artModel);
        Task<Art?> DeleteAsync(int id);
        Task<int> CountAsync(int id);
        Task<Art?> UpdateCurrentMarketPriceAsync(int id, decimal amount);
    }
}
