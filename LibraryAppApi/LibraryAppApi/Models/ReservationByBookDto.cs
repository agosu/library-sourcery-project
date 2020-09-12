using System;

namespace LibraryAppApi.Models
{
    public class ReservationByBookDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string OfficeName { get; set; }
        public int BookId { get; set; }
        public DateTime BookedFrom { get; set; }
        public DateTime PlannedReturnDate { get; set; }

    }
}
