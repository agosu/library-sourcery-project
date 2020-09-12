using LibraryAppData.Models;
using System;

namespace LibraryAppApi.Models
{
    public class WaitlistDto
    {
        public int Id { get; set; }
        public string EmployeeName { get; set; }
        public string OfficeName { get; set; }
        public DateTime RequestedOn { get; set; }
    }
}
