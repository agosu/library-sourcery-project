using System;

namespace LibraryAppApi.Models
{
    public class WishForCreationDto
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Isbn { get; set; }
        public int PublicationDate { get; set; }
        public string Description { get; set; }
    }
}