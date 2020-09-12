using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryAppData.Migrations
{
    public partial class SeedingUserTableNew : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "OfficeId", "Email", "FullName", "PhoneNumber", "PhotoUrl", "Role" },
                values: new object[,]
                {
                    {4, 1, "agota@imunitas.onmicrosoft.com", "Agota Agota", "+37099899999", "https://randomuser.me/api/portraits/women/62.jpg", "User"},
                    {5, 2, "andrius@imunitas.onmicrosoft.com", "Andrius Andrius", "+37099899999", "https://randomuser.me/api/portraits/men/62.jpg", "User"},
                    {6, 1, "bernardas@imunitas.onmicrosoft.com", "Bernardas Bernardas", "+37099899999", "https://randomuser.me/api/portraits/men/60.jpg", "User"},
                    {7, 2, "vladas@imunitas.onmicrosoft.com", "Vladas Vladas", "+37099899999", "https://randomuser.me/api/portraits/men/59.jpg", "User"},
                    {8, 1, "titas@imunitas.onmicrosoft.com", "Titas Titas", "+37099899999", "https://randomuser.me/api/portraits/men/58.jpg", "User"},
                    {9, 2, "robertas@imunitas.onmicrosoft.com", "Robertas Robertas", "+37099899999", "https://randomuser.me/api/portraits/men/57.jpg", "User"},
                    {10, 1, "pavel@imunitas.onmicrosoft.com", "Pavel Pavel", "+37099899999", "https://randomuser.me/api/portraits/men/56.jpg", "User"},
                    {11, 2, "kaunas@imunitas.onmicrosoft.com", "Kaunas Kaunas", "+37099899999", "https://randomuser.me/api/portraits/women/61.jpg", "Admin"},
                    {12, 1, "vilnius@imunitas.onmicrosoft.com", "Vilnius Vilnius", "+37099899999", "https://randomuser.me/api/portraits/men/55.jpg", "Admin"}
                });

            /*migrationBuilder.DeleteData(
                "Users",
                "Email",
                new object[] {"tom@email.com", "jim@email.com", "jess@email.com"}
            );*/
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                "Users",
                "Email",
                new object[]
                {
                    "agota@imunitas.onmicrosoft.com",
                    "andrius@imunitas.onmicrosoft.com",
                    "bernardas@imunitas.onmicrosoft.com",
                    "vladas@imunitas.onmicrosoft.com",
                    "titas@imunitas.onmicrosoft.com",
                    "robertas@imunitas.onmicrosoft.com",
                    "pavel@imunitas.onmicrosoft.com",
                    "kaunas@imunitas.onmicrosoft.com",
                    "vilnius@imunitas.onmicrosoft.com"
                }
            );
            
            /*migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "OfficeId", "Email", "FullName", "PhoneNumber", "PhotoUrl", "Role" },
                values: new object[,]
                {
                    {3, 2, "jess@email.com", "Jessica Albins", "+37099899999", "https://randomuser.me/api/portraits/women/62.jpg", "Back-end developer"},
                    {2, 1, "jim@email.com", "Jim Cornel", "+37092999999", "https://randomuser.me/api/portraits/men/60.jpg", "Full-stack developer"},
                    {1, 1, "tom@email.com", "Tom Parkins", "+37019999999", "https://randomuser.me/api/portraits/men/62.jpg", "Front-end developer"}
                });*/
        }
    }
}
