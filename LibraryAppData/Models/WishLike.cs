using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryAppData.Models
{
    public class WishLike
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [ForeignKey("WishId")]
        public int WishId { get; set; }
        
        [Required]
        public Wish Wish { get; set; }
        
        [ForeignKey("UserId")]
        public int UserId { get; set; }
        
        [Required]
        public User User { get; set; }
    }
}