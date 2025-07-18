using auction_backend.Dto.Store;
using auction_backend.Models;

namespace auction_backend.Mappers
{
    public static class StoreMappers
    {
        public static StoreDto ToStoreDto(this Store storeModel)
        {
            return new StoreDto
            {
                Id = storeModel.Id,
                Name = storeModel.Name,
                Email = storeModel.Email,
                PhoneNumber = storeModel.PhoneNumber,
                Address = storeModel.Address,
                CoverPhoto = storeModel.CoverPhoto,
                ProfilePhoto = storeModel.ProfilePhoto,
                CreatedOn = storeModel.CreatedOn,
                UserId = storeModel.UserId,
                Arts = storeModel.Arts.Select(a => a.ToArtDto()).ToList(),
            };
        }

        public static Store ToStoreFromCreate(this CreateStoreDto storeDto, string userId)
        {
            return new Store
            {
                Name = storeDto.Name,
                Email = storeDto.Email,
                PhoneNumber = storeDto.PhoneNumber,
                Address = storeDto.Address,
                CoverPhoto = storeDto.CoverPhoto,
                ProfilePhoto = storeDto.ProfilePhoto,
                UserId = userId,
                Arts = new List<Art>()
            };
        }

        public static Store ToStoreFromUpdate(this UpdateStoreDto storeDto, int id)
        {
            return new Store
            {
                Name = storeDto.Name,
                Email = storeDto.Email,
                PhoneNumber = storeDto.PhoneNumber,
                Address = storeDto.Address,
                CoverPhoto = storeDto.CoverPhoto,
                ProfilePhoto = storeDto.ProfilePhoto,
            };
        }
    }
}
