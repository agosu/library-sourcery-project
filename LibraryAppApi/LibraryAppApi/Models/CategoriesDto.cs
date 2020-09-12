using System.ComponentModel.DataAnnotations;

namespace LibraryAppApi.Models
{
    public class CategoriesDto
    {
        public int Id { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public string Redirect_path { get; set; }
    }
}
