using LibraryAppData.Models;
using System.ComponentModel.DataAnnotations;

namespace LibraryAppApi.Models
{
    public class UserForCreationDto
    {
        [Required]
        [MaxLength(70)]
        public string FullName { get; set; }
        [Required]
        public int RoleId { get; set; }
        public Role Role { get; set; }
        [Required]
        public int OfficeId { get; set; }
        public string DefaultOffice { get; set; }
        public Office Office { get; set; }
        [EmailAddress]
        public string Email { get; set; }
    }
}
