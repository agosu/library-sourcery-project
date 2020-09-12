using System;

namespace LibraryAppApi.Models
{
    public class ReservationByOfficeDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string BookCover { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public decimal Rating { get; set; }
        public string OfficeName { get; set; }
        public string Status { get; set; }
        public int BookId { get; set; }
        public DateTime BookedFrom { get; set; }
        public DateTime PlannedReturnDate { get; set; }
    }
}
