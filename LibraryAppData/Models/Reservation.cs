using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata.Ecma335;

namespace LibraryAppData.Models
{
    public class Reservation
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int LibraryId { get; set; }
        [Required]
        public Library Library { get; set; }

        public int UserId { get; set; }
        [Required]
        public User User { get; set; }

        [Required]
        public DateTime BookedFrom { get; set; }

        public DateTime? ReturnDate { get; set; }

        [Required]
        public DateTime PlannedReturnDate { get; set; }

        public int? Rating { get; set; }
    }
}
