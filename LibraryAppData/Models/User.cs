using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryAppData.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FullName { get; set; }
        [ForeignKey("OfficeId")]
        public int OfficeId { get; set; }
        public Office Office { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string PhotoUrl { get; set; }
        [ForeignKey("RoleId")]
        public int RoleId { get; set; }
        public Role Role { get; set; }
        public bool EmailNotiOnReturnDate { get; set; } = true;
        public bool EmailNotiOnBookAvailable { get; set; } = true;
        public bool AppNotiOnReturnDate { get; set; } = true;
        public bool AppNotiOnBookAvailable { get; set; } = true;
        public bool AppNotiOnNewBook { get; set; } = true;
    }
}
