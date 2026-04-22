namespace lipadcebu2.Models { 

public class Booking()
{
        public int Id { get; set; }
        public string GuestName { get; set; }
        public string GuestEmail { get; set; }
        public string PhoneNumber { get; set; }
        public string RoomType { get; set; }
        public int NumberOfRooms { get; set; }
        public string CheckInDate { get; set; }
        public string CheckOutDate { get; set; }
        public string? SpecialRequests { get; set; }
        public decimal TotalPrice { get; set; }       
        public DateTime BookingDate { get; set; } = DateTime.Now;    
}

}