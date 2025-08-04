using auction_backend.Data;
using auction_backend.Interfaces;
using auction_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace auction_backend.Repository
{
    public class BidRepository: IBidRepository
    {
        private readonly ApplicationDBContext _context;

        public BidRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Bid>> GetAllAsync()
        {
            return await _context.Bid.ToListAsync();
        }
        public async Task<List<Bid>> GetByAuctionAsync(int id)
        {
            return await _context.Bid.Where(x => x.AuctionId == id).OrderByDescending(a => a.BidDate).ToListAsync();
        }
        public async Task<List<Bid>> GetByUserAsync(string userId)
        {
            return await _context.Bid.Where(x => x.UserId == userId).ToListAsync();
        }
        public async Task<Bid> PlaceBidAsync(Bid bidModel)
        {
            await _context.Bid.AddAsync(bidModel);
            await _context.SaveChangesAsync();
            return bidModel;
        }
    }
}
