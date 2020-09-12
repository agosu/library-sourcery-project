namespace LibraryAppApi.Models
{
    public class WishDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string ImageUrl { get; set; }
        public string Isbn { get; set; }
        public int PubDate { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public string CreatedOn { get; set; }
        public int Rating { get; set; }
        public bool IsLiked { get; set; }
    }
}