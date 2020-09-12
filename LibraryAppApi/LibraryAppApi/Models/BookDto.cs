using System.Collections.Generic;

namespace LibraryAppApi.Models
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Isbn { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public IEnumerable<string> Author { get; set; }    
        public string Format { get; set; }
        public int PubDate { get; set; }
        public string Publisher { get; set; }
        public string BookCover { get; set; }
        public float Rating { get; set; }
        public int NumOfRatings { get; set; }
        public int NumOfReviews { get; set; }
        public bool IsAvailable { get; set; }
        public string Category { get; set; }
        public int NumOfPages { get; set; }
    }
}
