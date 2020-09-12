namespace LibraryAppApi.Models
{
    public class BookForUpdatingDto
    {
        public string Isbn { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Format { get; set; }
        public int PubDate { get; set; }
        public string Publisher { get; set; }
        public string Description { get; set; }
        public string BookCover { get; set; }
        public float Rating { get; set; }
        public int NumOfRatings { get; set; }
        public int NumOfReviews { get; set; }
        public bool IsAvailable { get; set; }
    }
}
