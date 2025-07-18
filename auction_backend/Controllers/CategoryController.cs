using auction_backend.Data;
using auction_backend.Dto.Category;
using auction_backend.Interfaces;
using auction_backend.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace auction_backend.Controllers
{
    [Route("auction_backend/category")]
    [ApiController]
    public class CategoryController : Controller
    {
        private readonly ApplicationDBContext _context;
        private readonly ICategoryRepository _categoryRepo;

        public CategoryController(ApplicationDBContext context, ICategoryRepository categoryRepo)
        {
            _context = context;
            _categoryRepo = categoryRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _categoryRepo.GetAllAsync();
            var categoryDto = categories.Select(s => s.ToCategoryDto());
            return Ok(categoryDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var category = await _categoryRepo.GetByIdAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category.ToCategoryDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(CreateCategoryDto categoryDto)
        {
            var categoryModel = categoryDto.ToCategoryFromCreate();
            await _categoryRepo.CreateAsync(categoryModel);
            return CreatedAtAction(nameof(GetById), new { id = categoryModel.Id }, categoryModel.ToCategoryDto());
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var categoryModel = await _categoryRepo.DeleteAsync(id);

            if (categoryModel == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, UpdateCategoryDto categoryDto)
        {
            var categoryModel = await _categoryRepo.UpdateAsync(id, categoryDto);

            if (categoryModel == null)
            {
                return NotFound();
            }

            return Ok(categoryModel.ToCategoryDto());
        }
    }
}
