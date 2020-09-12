using System;

namespace LibraryAppApi.Models
{
    public class CommentForCreationDto
    {
        public int BookId { get; set; }
        public string Text { get; set; }
    }
}