namespace LibraryAppApi.Models
{
    public class UserDto
    {
        public string FirstName
        {
            get
            {
                return FullName.Split(' ')[0];
            }
        }
        public string LastName
        {
            get
            {
                return FullName.Split(' ')[1];
            }
        }
        public int Id { get; set; }
        public string FullName { get; set; }
        public int RoleId { get; set; }
        public string Role { get; set; }
        public int OfficeId { get; set; }
        public string DefaultOffice { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string PhotoUrl { get; set; }
        public bool EmailNotiOnReturnDate { get; set; }
        public bool EmailNotiOnBookAvailable { get; set; }
        public bool AppNotiOnReturnDate { get; set; }
        public bool AppNotiOnBookAvailable { get; set; }
        public bool AppNotiOnNewBook { get; set; }

    }
}
