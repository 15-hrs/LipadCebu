using Microsoft.AspNetCore.Mvc;

namespace lipadcebu2.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Homepage()
        {
            return View();
        }

        public IActionResult Choices()
        {
            return View();
        }

        public IActionResult Confirmation()
        {
            return View();
        }
    }
}
