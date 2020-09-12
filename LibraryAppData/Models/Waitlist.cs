using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryAppData.Models
{
    public class Waitlist
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public Library Library { get; set; }
        [Required]
        [ForeignKey("LibraryId")]
        public int LibraryId { get; set; }

        [Required]
        public User User { get; set; }
        [Required]
        [ForeignKey("UserId")]
        public int UserId { get; set; }

        [Required]
        public DateTime RequestedOn { get; set; }

        [Required]
        public bool IsActive { get; set; }


    }
}
