using auction_backend.Dto.Category;
using auction_backend.Models;

namespace auction_backend.Interfaces
{
    public interface IContactRepository
    {
        Task<List<Contactus>> GetAllAsync();
        Task<Contactus?> GetByIdAsync(int id);
        Task<Contactus> CreateAsync(Contactus contactModel);
    }
}
