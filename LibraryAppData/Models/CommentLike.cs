using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryAppData.Models
{
    public class CommentLike
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [ForeignKey("CommentId")]
        public int CommentId { get; set; }
        
        [Required]
        public Comment Comment { get; set; }
        
        [ForeignKey("UserId")]
        public int UserId { get; set; }
        
        [Required]
        public User User { get; set; }
    }
}