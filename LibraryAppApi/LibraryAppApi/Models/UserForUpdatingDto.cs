using System.ComponentModel.DataAnnotations;

namespace LibraryAppApi.Models
{
    public class UserForUpdatingDto
    {
        [Required]
        [MaxLength(70)]
        public string FullName { get; set; }
        [Required]
        public int RoleId { get; set; }
        [Required]
        public int OfficeId { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        [Phone]
        public string PhoneNumber { get; set; }
        public string PhotoUrl { get; set; }
        public bool EmailNotiOnReturnDate { get; set; }
        public bool EmailNotiOnBookAvailable { get; set; }
        public bool AppNotiOnReturnDate { get; set; }
        public bool AppNotiOnBookAvailable { get; set; }
        public bool AppNotiOnNewBook { get; set; }
    }
}
