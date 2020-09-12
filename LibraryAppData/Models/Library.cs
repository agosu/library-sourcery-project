using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryAppData.Models
{
    public class Library
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int BookId { get; set; }
        
        [Required]
        [ForeignKey("OfficeId")]
        public int OfficeId { get; set; }
        
        [Required]
        public int BookCount { get; set; }

        [Required]
        public int CreatedById { get; set; }
        
        [Required]
        public DateTime CreatedOn { get; set; }
        
        [Required]
        public int UpdatedById { get; set; }
        
        [Required]
        public DateTime UpdatedOn { get; set; }

        // Navigation props
        public Book Book { get; set; }
        public Office Office { get; set; }
        public User CreatedBy { get; set; }
        public User UpdatedBy { get; set; }
    }
}
