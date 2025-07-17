using auction_backend.Data;
using auction_backend.Models;

namespace auction_backend.Repository
{
    public class CategoryRepository
    {
        private readonly ApplicationDBContext _context;

        public CategoryRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await _context.Category.ToListAsync();
        }

    }
}
