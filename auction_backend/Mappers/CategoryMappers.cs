using auction_backend.Dto.Category;
using auction_backend.Models;

namespace auction_backend.Mappers
{
    public static class CategoryMappers
    {
        public static CategoryDto ToCategoryDto(this Category categoryModel)
        {
            return new CategoryDto
            {
                Id = categoryModel.Id,
                CategoryName = categoryModel.CategoryName,
                Image = categoryModel.Image,
                Icon = categoryModel.Icon,
            };
        }

        public static Category ToCategoryFromCreate(this CreateCategoryDto createCategoryDto)
        {
            return new Category
            {
                CategoryName = createCategoryDto.CategoryName,
                Image = createCategoryDto.Image,
                Icon = createCategoryDto.Icon
            };
        }

        public static Category ToCategoryFromUpdate(this UpdateCategoryDto categoryDto, int id)
        {
            return new Category
            {
                CategoryName = categoryDto.CategoryName,
                Image = categoryDto.Image,
                Icon = categoryDto.Icon
            };
        }
    }
}
