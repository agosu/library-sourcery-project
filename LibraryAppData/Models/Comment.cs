using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryAppData.Models
{
    public class Comment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("BookId")]
        public int BookId { get; set; }
        
        [Required]
        public Book Book { get; set; }

        [ForeignKey("UserId")]
        public int UserId { get; set; }
        
        [Required]
        public User User { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Text { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }

        [Required]
        public int Rating { get; set; }
    }
}
