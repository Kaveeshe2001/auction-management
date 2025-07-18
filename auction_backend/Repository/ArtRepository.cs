using auction_backend.Data;
using auction_backend.Helpers;
using auction_backend.Interfaces;
using auction_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace auction_backend.Repository
{
    public class ArtRepository : IArtRepository
    {
        private readonly ApplicationDBContext _context;
        public ArtRepository(ApplicationDBContext context)
        {
            _context = context;
        }


        public async Task<List<Art>> GetAllAsync()
        {
            return await _context.Art.ToListAsync();
        }
        public async Task<Art> CreateAsync(Art artModel)
        {
            await _context.Art.AddAsync(artModel);
            await _context.SaveChangesAsync();
            return artModel;
        }
        public async Task<Art?> GetByIdAsync(int id)
        {

            return await _context.Art.FirstOrDefaultAsync(c => c.Id == id);
        }
        public async Task<List<Art?>> GetByCategoryAsync(int id)
        {
            return await _context.Art.Where(c => c.CategoryId == id).ToListAsync();
        }
        public async Task<List<Art?>> GetByStoreAsync(int id, QueryObject query)
        {
            if (query != null)
            {
                var skipNumber = (query.PageNumber - 1) * query.PageSize;
                return await _context.Art.Where(c => c.StoreId == id).Skip(skipNumber).Take(query.PageSize).ToListAsync();
            }
            else
            {
                return await _context.Art.Where(c => c.StoreId == id).ToListAsync();
            }
        }
        public async Task<Art?> UpdateAsync(int id, Art artModel)
        {
            var existingArt = await _context.Art.FindAsync(id);

            if (existingArt == null)
            {
                return null;
            }

            existingArt.Title = artModel.Title;
            existingArt.Image = artModel.Image;
            existingArt.CurrentMarketPrice = artModel.CurrentMarketPrice;
            existingArt.Condition = artModel.Condition;
            existingArt.isFramed = artModel.isFramed;
            existingArt.Height = artModel.Height;
            existingArt.Width = artModel.Width;
            existingArt.StoreId = artModel.StoreId;
            existingArt.CategoryId = artModel.CategoryId;

            await _context.SaveChangesAsync();
            return existingArt;
        }

        public async Task<Art?> DeleteAsync(int id)
        {
            var artModel = await _context.Art.FirstOrDefaultAsync(x => x.Id == id);

            if (artModel == null)
            {
                return null;
            }

            _context.Art.Remove(artModel);
            await _context.SaveChangesAsync();
            return artModel;
        }
        public async Task<int> CountAsync(int id)
        {
            return await _context.Art.CountAsync(c => c.StoreId == id);
        }

        public async Task<Art?> UpdateCurrentMarketPriceAsync(int id, decimal amount)
        {
            var existingArt = await _context.Art.FindAsync(id);

            if (existingArt == null)
            {
                return null;
            }

            existingArt.CurrentMarketPrice = amount;
            await _context.SaveChangesAsync();
            return existingArt;
        }

    }
}
