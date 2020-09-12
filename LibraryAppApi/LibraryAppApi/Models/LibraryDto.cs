using System;

namespace LibraryAppApi.Models
{
    public class LibraryDto
    {
        public int Id { get; set; }
        public BookDto Book { get; set; }
        public OfficeDto Office { get; set; }
        public int BookCount { get; set; }
        public UserDto CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public UserDto UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
