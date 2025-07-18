using auction_backend.Data;
using auction_backend.Interfaces;
using auction_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace auction_backend.Repository
{
    public class CategoryRepository : ICategoryRepository
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
        public async Task<Category> CreateAsync(Category categoryModel)
        {
            await _context.Category.AddAsync(categoryModel);
            await _context.SaveChangesAsync();
            return categoryModel;
        }
        public async Task<Category?> GetByIdAsync(int id)
        {
            return await _context.Category.FirstOrDefaultAsync(x => x.Id == id);

        }
        public async Task<Category?> UpdateAsync(int id, Category categoryModel)
        {
            var existingCategory = await _context.Category.FindAsync(id);

            if (existingCategory == null)
            {
                return null;
            }

            existingCategory.CategoryName = categoryModel.CategoryName;
            existingCategory.Image = categoryModel.Image;
            existingCategory.Icon = categoryModel.Icon;

            await _context.SaveChangesAsync();
            return existingCategory;

        }
        public async Task<Category?> DeleteAsync(int id)
        {
            var categoryModel = await _context.Category.FirstOrDefaultAsync(x => x.Id == id);

            if (categoryModel == null)
            {
                return null;
            }

            _context.Category.Remove(categoryModel);
            await _context.SaveChangesAsync();
            return categoryModel;

        }
    }
}
