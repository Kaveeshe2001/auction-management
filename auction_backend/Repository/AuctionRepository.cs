using auction_backend.Data;
using auction_backend.Helpers;
using auction_backend.Interfaces;
using auction_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace auction_backend.Repository
{
    public class AuctionRepository : IAuctionRepository
    {
        private readonly ApplicationDBContext _context;
        public AuctionRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task CheckAndUpdateStatus(Auction auction)
        {
            bool statusChanged = false;

            if (auction.EndDate <= DateTime.Now && auction.Status != "Complete")
            {
                auction.Status = "Complete";
                statusChanged = true;
            } else if (auction.StartDate <= DateTime.Now && auction.Status != "Active" && auction.EndDate > DateTime.Now)
            {
                auction.Status = "Active";
                statusChanged = true;
            } 

            if (statusChanged)
            {
                _context.Auction.Update(auction);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<List<Auction>> GetAllAsync()
        {
            var auctions = await _context.Auction.Where(s => s.Status != "Complete").ToListAsync();

            foreach (var auction in auctions)
            {
                await CheckAndUpdateStatus(auction);
            }

            return auctions;
        }
        public async Task<Auction> CreateAsync(Auction auctionModel)
        {
            await _context.Auction.AddAsync(auctionModel);
            await _context.SaveChangesAsync();
            return auctionModel;
        }

        public async Task<Auction?> GetByIdAsync(int id)
        {
            return await _context.Auction.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Auction>> GetByUserAsync(string userId, QueryObject query)
        {
            var auctionsQuery = _context.Auction.Where(x => x.UserId == userId);

            if (!string.IsNullOrWhiteSpace(query.Status))
            {
                auctionsQuery = auctionsQuery.Where(x => x.Status == query.Status);
            }

            var auctions = await auctionsQuery.ToListAsync();

            foreach ( var auction in auctions)
            {
                await CheckAndUpdateStatus(auction);
            }

            return auctions;
        }

        public async Task<Auction?> UpdateAsync(int id, Auction auctionModel)
        {
            var existingAuction = await _context.Auction.FindAsync(id);

            if (existingAuction == null)
            {
                return null;
            }

            existingAuction.StartDate = auctionModel.StartDate;
            existingAuction.EndDate = auctionModel.EndDate;
            existingAuction.Status = auctionModel.Status;
            existingAuction.ArtId = auctionModel.ArtId;

            await _context.SaveChangesAsync();
            return existingAuction;
        }

        public async Task<Auction?> DeleteAsync(int id)
        {
            var auctionModel = await _context.Auction.FirstOrDefaultAsync(x => x.Id == id);

            if (auctionModel == null)
            {
                return null;
            }

            _context.Auction.Remove(auctionModel);
            await _context.SaveChangesAsync();
            return auctionModel;
        }

        public async Task<Auction?> GetByArtId(int id)
        {
            return await _context.Auction.FirstOrDefaultAsync(x => x.ArtId == id);
        }

        public async Task<List<Auction>> GetLatestAsync(int? limit = null)
        {
            var query = _context.Auction.Where(s => s.Status != "Complete").OrderByDescending(a => a.CreatedDate);

            if (limit.HasValue)
            {
                query = (IOrderedQueryable<Auction>)query.Take(limit.Value);
            }

            var auctions = await query.ToListAsync();

            foreach (var auction in auctions)
            {
                await CheckAndUpdateStatus(auction);
            }

            return auctions;
        }
    }
}
