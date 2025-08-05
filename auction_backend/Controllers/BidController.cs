using auction_backend.Data;
using auction_backend.Dto.Bid;
using auction_backend.Extentions;
using auction_backend.Interfaces;
using auction_backend.Mappers;
using auction_backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Stripe;

namespace auction_backend.Controllers
{
    [Route("auction_backend/bid")]
    [ApiController]
    public class BidController : Controller
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<User> _userManager;
        private readonly StripeSettings _stripeSettings;
        private readonly IBidRepository _bidRepo;
        private readonly IArtRepository _artRepo;

        public BidController(ApplicationDBContext context, UserManager<User> userManager, IOptions<StripeSettings> stripeSettings, IBidRepository bidRepo, IArtRepository artRepo)
        {
            _context = context;
            _userManager = userManager;
            _stripeSettings = stripeSettings.Value;
            StripeConfiguration.ApiKey = _stripeSettings.SecretKey;
            _bidRepo = bidRepo;
            _artRepo = artRepo;
        }

        [HttpGet]
        public IActionResult PlaceBid()
        {
            return Ok(new { PublishableKey = _stripeSettings.PublishableKey });
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PlaceBidSession(PlaceBidDto bidDto)
        {
            var username = User.GetUsername(); 

            if (string.IsNullOrEmpty(username))
            {
                return BadRequest("Username cannot be null or empty");
            }

            var user = await _userManager.FindByNameAsync(username);    

            if (user == null)
            {
                return NotFound("User not found");
            }

            var userEmail = user.Email;
            var userId = user.Id;
            var amount = bidDto.Amount;

            var auctionId = bidDto.AuctionId;

            //Stripe code
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long?)amount,
                Currency = "usd",
                ReceiptEmail = userEmail,
                PaymentMethodTypes = new List<string> { "card" },
                PaymentMethodOptions = new PaymentIntentPaymentMethodOptionsOptions
                {
                    Card = new PaymentIntentPaymentMethodOptionsCardOptions
                    {
                        CaptureMethod = "manual",
                    },
                },

            };

            var auction = await _context.Auction
                .Include(a => a.Art)
                .FirstOrDefaultAsync(a => a.Id == auctionId);

            if (auction == null)
            {
                return NotFound("Auction not found");
            }
            var art = auction.Art;

            if (art == null)
            {
                return NotFound("Art not found for this auction");
            }

            var artId = art.Id;
            var artCurrentMarketPrice = art.CurrentMarketPrice;

            if (amount <= artCurrentMarketPrice)
            {
                return BadRequest("Bid amount should greater than to current price");
            }

            try
            {
                var service = new PaymentIntentService();
                PaymentIntent intent = await service.CreateAsync(options);
                await _artRepo.UpdateCurrentMarketPriceAsync(artId, amount);
                var bidModel = bidDto.ToPlaceBidDto(userId, "SJhdjshdk");
                await _bidRepo.PlaceBidAsync(bidModel);

                return Ok("Bid Place Successfully");
            } catch (StripeException e)
            {
                return BadRequest(new { error = e.Message });
            } catch (Exception ex)
            {
                return StatusCode(500, new { error = "An unexpected error occurred: " + ex.Message });
            } 
        }

        [HttpPost("capture")]
        [Authorize]
        public async Task<IActionResult> CapturePayment(CapturePaymentDto captureDto)
        {
            var bid = await _context.Bid
                .FirstOrDefaultAsync(b => b.PaymentIntentId == captureDto.PaymentIntentId);

            if (bid == null)
            {
                return NotFound("Bid not found");
            }

            var auction = await _context.Auction.FindAsync(bid.AuctionId);

            if (auction == null | auction?.Status != "Complete")
            {
                return BadRequest("Auction is not over yet");
            }

            var highestBid = await _context.Bid.Where(b => b.AuctionId == auction.Id)
                .OrderByDescending(b => b.Amount)
                .FirstOrDefaultAsync();

            if (highestBid == null || highestBid.UserId != bid.UserId)
            {
                return BadRequest("You are not the highest bidder");
            }

            var service = new PaymentIntentService();

            try
            {
                PaymentIntent intent = await service.CaptureAsync(bid.PaymentIntentId);

                bid.IsPaymentCaptured = true;
                await _context.SaveChangesAsync();

                return Ok(new { success = true, paymentIntent = intent });
            } catch (StripeException e)
            {
                return BadRequest(new { error = e.Message } );
            } catch (Exception ex)
            {
                return StatusCode(500, new { error = "An unexpected error occurred: " + ex.Message });
            }
        }

        [HttpGet("auction/{id}")]
        public async Task<IActionResult> GetByAuction([FromRoute] int id)
        {
            var bids = await _bidRepo.GetByAuctionAsync(id);

            var bidDto = bids.Select(s => s.ToBidDto());

            return Ok(bidDto);
        }
    }
}
