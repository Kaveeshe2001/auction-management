using auction_backend.Data;
using auction_backend.Dto.Art;
using auction_backend.Extentions;
using auction_backend.Helpers;
using auction_backend.Interfaces;
using auction_backend.Mappers;
using auction_backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace auction_backend.Controllers
{
    [Route("auction_backend/art")]
    [ApiController]
    public class ArtController : Controller
    {
        private readonly ApplicationDBContext _context;
        private readonly IArtRepository _artRepo;
        private readonly IStoreRepository _storeRepo;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<ArtController> _logger; 
        
        public ArtController(ApplicationDBContext context, UserManager<User> userManager, IArtRepository artRepo, IStoreRepository storeRepo, ILogger<ArtController> logger)
        {
            _context = context;
            _userManager = userManager;
            _artRepo = artRepo;
            _storeRepo = storeRepo;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var arts = await _artRepo.GetAllAsync();
            var artDto = arts.Select(s => s.ToArtDto());

            return Ok(artDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var art = await _artRepo.GetByIdAsync(id);

            if (art == null)
            {
                return NotFound();
            }

            return Ok(art.ToArtDto());
        }

        [HttpGet("category/{id}")]
        public async Task<IActionResult> GetByCategory([FromRoute] int id)
        {
            var arts = await _artRepo.GetByCategoryAsync(id);
            var artDto = arts.Select(s => s.ToArtDto());
            return Ok(artDto);
        }

        [HttpGet("store/{id}")]
        public async Task<IActionResult> GetByStore([FromRoute] int id, [FromQuery] QueryObject query)
        {
            List<Art?> arts;

            if(query != null)
            {
                arts = await _artRepo.GetByStoreAsync(id, query);
            } else
            {
                arts = await _artRepo.GetByStoreAsync(id);
            }

            var artDto = arts.Select(s => s.ToArtDto());
            var totalArtCount = await _artRepo.CountAsync(id);

            return Ok(new
            {
                TotalCount = totalArtCount,
                Arts = artDto
            });
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(CreateArtRequestDto artDto)
        {
            var username = User.GetUsername();
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound("User cannot be found");
            }

            var store = await _context.Store
                .Where(x => x.UserId.ToLower() == user.Id.ToLower())
                .FirstOrDefaultAsync();

            if (store == null)
            {
                return NotFound("Create a store first");
            }

            try
            {
                var artModel = artDto.ToArtFromCreate(store.Id);
                await _artRepo.CreateAsync(artModel);
                return CreatedAtAction(nameof(GetById), new { id = artModel.Id }, artModel.ToArtDto());
            } catch (Exception ex)
            {
                var errorMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return StatusCode(500, "An error occurred while creating the art: " +  errorMessage);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var artModel = await _artRepo.DeleteAsync(id);

            if (artModel == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, UpdateArtRequestDto artDto)
        {
            var artModel = await _artRepo.UpdateAsync(id, artDto.ToArtFromUpdate(id));

            if(artModel == null)
            {
                return NotFound();
            }

            return Ok(artModel.ToArtDto());
        }
    }
}
