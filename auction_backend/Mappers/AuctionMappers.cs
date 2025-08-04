using auction_backend.Dto.Auction;
using auction_backend.Models;

namespace auction_backend.Mappers
{
    public static class AuctionMappers
    {
        public static AuctionDto ToAuctionDto(this Auction auctionModel)
        {
            return new AuctionDto
            {
                Id = auctionModel.Id,
                Status = auctionModel.Status,
                StartDate = auctionModel.StartDate,
                EndDate = auctionModel.EndDate,
                UserId = auctionModel.UserId,
                ArtId = auctionModel.ArtId,
                CreatedDate = auctionModel.CreatedDate,
            };
        }
        public static Auction ToCreateAuctionDto(this CreateAuctionDto auctionDto, string userId)
        {
            return new Auction
            {
                StartDate = auctionDto.StartDate,
                EndDate = auctionDto.EndDate,
                UserId = userId,
                ArtId = auctionDto.ArtId,
            };
        }
        public static Auction ToUpdateAuctionDto(this UpdateAuctionDto auctionDto, int id)
        {
            return new Auction
            {
                Status = auctionDto.Status,
                StartDate = auctionDto.StartDate,
                EndDate = auctionDto.EndDate,
                ArtId = auctionDto.ArtId
            };
        }
    }
}
