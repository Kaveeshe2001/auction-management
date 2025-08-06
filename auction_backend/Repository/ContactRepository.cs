using auction_backend.Data;
using auction_backend.Interfaces;
using auction_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace auction_backend.Repository
{
    public class ContactRepository : IContactRepository
    {
        private readonly ApplicationDBContext _context;

        public ContactRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Contactus>> GetAllAsync()
        {
            return await _context.Contactus.ToListAsync();
        }

        public async Task<Contactus> CreateAsync(Contactus contactModel)
        {
            await _context.Contactus.AddAsync(contactModel);
            await _context.SaveChangesAsync();
            return contactModel;
        }

        public async Task<Contactus?> GetByIdAsync(int id)
        {
            return await _context.Contactus.FirstOrDefaultAsync(x => x.Id == id);
        }

    }
}
