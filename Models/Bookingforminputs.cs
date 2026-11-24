namespace lipadcebu2.Models { 

public class Booking
{
        public int Id { get; set; }
        public string GuestName { get; set; } = string.Empty;
        public string GuestEmail { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string RoomType { get; set; } = string.Empty;
        public int NumberOfRooms { get; set; }
        public string CheckInDate { get; set; } = string.Empty;
        public string CheckOutDate { get; set; } = string.Empty;
        public string? SpecialRequests { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime BookingDate { get; set; } = DateTime.Now;
}

}