using auction_backend.Models;

namespace auction_backend.Interfaces
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(int id);
        Task<Category?> UpdateAsync(int id, Category categoryModel);
        Task<Category> CreateAsync(Category categoryModel);
        Task<Category?> DeleteAsync(int id);
    }
}
