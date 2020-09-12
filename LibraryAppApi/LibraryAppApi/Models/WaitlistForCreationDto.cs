using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAppApi.Models
{
    public class WaitlistForCreationDto
    {
        public int LibraryId { get; set; }
        public int UserId { get; set; }
    }
}
