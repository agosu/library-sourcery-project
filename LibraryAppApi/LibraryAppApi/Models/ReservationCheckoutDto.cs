using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAppApi.Models
{
    public class ReservationCheckoutDto
    {
        public int LibraryId { get; set; }
        public DateTime? PlannedReturnDate { get; set; }
    }
}
