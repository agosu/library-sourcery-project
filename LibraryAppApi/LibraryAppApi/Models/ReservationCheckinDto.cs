using System.Diagnostics.Contracts;

namespace LibraryAppApi.Models
{
    public class ReservationCheckinDto
    {
        public int? Rating { get; set; }
        public string Comment { get; set; }
    }
}
