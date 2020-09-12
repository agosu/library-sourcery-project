using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAppApi.Models
{
    public class ReservationForCreatingDto
    {
        public int BookId { get; set; }
        public int OfficeId { get; set; }
        public string PlannedReturnDate { get; set; }    
    }
}
