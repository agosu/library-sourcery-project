namespace LibraryAppApi.Models
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Author { get; set; }
        public string Text { get; set; }
        public string Image { get; set; }
        public string CreatedOn { get; set; }
        public int Rating { get; set; }
        public bool IsLiked { get; set; }
    }
}
