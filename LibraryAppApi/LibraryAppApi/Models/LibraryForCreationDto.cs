namespace LibraryAppApi.Models
{
    public class LibraryForCreationDto
    {
        public int BookId { get; set; }
        public int OfficeId { get; set; }
        public int BookCount { get; set; }
        public int CreatedById { get; set; }
    }
}
