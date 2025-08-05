using Microsoft.AspNetCore.Mvc;

namespace auction_backend.Controllers
{
    public class BidController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
