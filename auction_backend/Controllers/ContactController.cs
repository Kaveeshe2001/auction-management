using auction_backend.Data;
using auction_backend.Dto.ContactUs;
using auction_backend.Interfaces;
using auction_backend.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace auction_backend.Controllers
{
    [Route("auction_backend/contact")]
    [ApiController]
    public class ContactController : Controller
    {
        private readonly ApplicationDBContext _context;
        private readonly IContactRepository _contactRepo;

        public ContactController(ApplicationDBContext context, IContactRepository contactRepo)
        {
            _context = context;
            _contactRepo = contactRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var contact = await _contactRepo.GetAllAsync();
            var contactDto = contact.Select(s => s.ToContactDto());
            return Ok(contactDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var contact = await _contactRepo.GetByIdAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact.ToContactDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateContactDto contactDto)
        {
            var contactModel = contactDto.ToContactFromCreate();
            await _contactRepo.CreateAsync(contactModel);
            return CreatedAtAction(nameof(GetById), new { id = contactModel.Id}, contactModel.ToContactDto());
        }
    }
}
