using System.Collections.Generic;
using LibraryAppApi.Models;

namespace LibraryAppApi
{
    public class ReservationDataStore
    {
        public static ReservationDataStore Current { get; } = new ReservationDataStore();
        public List<ReservationDto> reservations { get; set; }
        public ReservationDataStore()
        {
            reservations = new List<ReservationDto>()
            {
                new ReservationDto()
                {
                    Id = 1,
                    BookId  = 1,
                    OfficeId = 1,
                    BookedFrom = "Feb 12, 2020",
                    PlannedReturnDate = "Apr 12, 2020"
                },
                new ReservationDto()
                {
                    Id = 2,
                    BookId  = 2,
                    OfficeId = 2,
                    BookedFrom = "Feb 13, 2020",
                    PlannedReturnDate = "Apr 13, 2020"
                },
                new ReservationDto()
                {
                    Id = 3,
                    BookId  = 3,
                    OfficeId = 3,
                    BookedFrom = "Feb 14, 2020",
                    PlannedReturnDate = "Apr 14, 2020"
                },

            };
        }
    } 
}
