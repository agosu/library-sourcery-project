using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryAppData.Models
{
    public class Wish
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(255)]
        public string Title { get; set; }
        
        [Required]
        public string Author { get; set; }
        
        [Required]
        public string ImageUrl { get; set; }
        
        [MaxLength(50)]
        public string Isbn { get; set; }
        
        [Required]
        public int PubDate { get; set; }
        
        [MaxLength(1000)]
        public string Description { get; set; }
        
        [ForeignKey("UserId")]
        public int UserId { get; set; }
        
        [Required]
        public User User { get; set; }
        
        [Required]
        public DateTime CreatedOn { get; set; }
        
        [Required]
        public int Rating { get; set; }
    }
}