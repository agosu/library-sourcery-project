using LibraryAppApi.Models;
using System;
using System.Collections.Generic;

namespace LibraryAppApi
{
    public class WaitlistDataStore
    {
        public static WaitlistDataStore Current { get; } = new WaitlistDataStore();
        public List<WaitlistDto> Waitlist { get; set; }
        public WaitlistDataStore()
        {
            Waitlist = new List<WaitlistDto>()
            {
               new WaitlistDto()
               {
                   Id = 1,
                   EmployeeName = "Jessica Albins",
                   OfficeName = "Kaunas",
                   RequestedOn = new DateTime(2020, 10, 13)
               },
               new WaitlistDto()
               {
                   Id = 2,
                   EmployeeName = "Josh Tringers",
                   OfficeName = "Vilnius",
                   RequestedOn = new DateTime(2020, 10, 25)
               },
               new WaitlistDto()
               {
                   Id = 3,
                   EmployeeName = "Albe Froncson",
                   OfficeName = "Vilnius",
                   RequestedOn = new DateTime(2020, 11, 10)
               },

            };
        }
    }
}
