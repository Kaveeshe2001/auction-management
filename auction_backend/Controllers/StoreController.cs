﻿using auction_backend.Data;
using auction_backend.Dto.Store;
using auction_backend.Extentions;
using auction_backend.Interfaces;
using auction_backend.Mappers;
using auction_backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace auction_backend.Controllers
{
    [Route("auction_backend/store")]
    [ApiController]
    public class StoreController : Controller
    {
        private readonly ApplicationDBContext _context;
        private readonly IStoreRepository _storeRepo;
        private readonly UserManager<User> _userManager;

        public StoreController(ApplicationDBContext context, IStoreRepository storeRepo, UserManager<User> userManager)
        {
            _context = context;
            _storeRepo = storeRepo;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var stores = await _storeRepo.GetAllAsync();
            var storeDto = stores.Select(s => s.ToStoreDto());
            return Ok(storeDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var store = await _storeRepo.GetByIdAsync(id);

            if (store == null)
            {
                return NotFound();
            }
            return Ok(store.ToStoreDto());
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUser([FromRoute] string userId)
        {
            var store = await _storeRepo.GetByUserIdAsync(userId);

            if (store == null)
            {
                return NotFound();
            }
            return Ok(store.ToStoreDto());

        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(CreateStoreDto storeDto)
        {
            var username = User.GetUsername();

            if (string.IsNullOrEmpty(username))
            {
                return BadRequest("Username cannot be null or empty");
            }
            var user = await _userManager.FindByNameAsync(username);

            if(user == null)
            {
                return NotFound("User not found");
            }

            var userId = user.Id;

            var storeModel = storeDto.ToStoreFromCreate(userId);
            await _storeRepo.CreateAsync(storeModel);
            return CreatedAtAction(nameof(GetById), new { id = storeModel.Id }, storeModel.ToStoreDto());
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var storeModel = await _storeRepo.DeleteAsync(id);

            if (storeModel == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, UpdateStoreDto storeDto)
        {
            var storeModel = await _storeRepo.UpdateAsync(id, storeDto.ToStoreFromUpdate(id));

            if (storeModel == null)
            {
                return NotFound();
            }
            return Ok(storeModel.ToStoreDto());
        }
    }
}
