using lipadcebu2.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace lipadcebu2.Controllers
{
    public class BookingController : Controller
    {
        [HttpGet]
        public IActionResult Booking()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Booking(
            string GuestName,
            string GuestEmail,
            string PhoneNumber,
            string RoomType,
            int NumberOfRooms,
            string CheckInDate,
            string CheckOutDate,
            string SpecialRequests,
            decimal TotalPrice
        )
        {
            var booking = new Booking
            {
                GuestName = GuestName,
                GuestEmail = GuestEmail,
                PhoneNumber = PhoneNumber,
                RoomType = RoomType,
                NumberOfRooms = NumberOfRooms,
                CheckInDate = CheckInDate,
                CheckOutDate = CheckOutDate,
                SpecialRequests = SpecialRequests,
                TotalPrice = TotalPrice,
                BookingDate = DateTime.Now
            };

            return View("../Home/Confirmation", booking);
        }

        public IActionResult Paying()
        {
            return View();
        }
    }
} 