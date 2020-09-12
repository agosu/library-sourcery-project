namespace LibraryAppApi.Models
{
    public class WishForUpdateDto
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Isbn { get; set; }
        public int PubDate { get; set; }
        public string Description { get; set; }
    }
}