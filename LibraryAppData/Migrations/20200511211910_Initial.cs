using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryAppData.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 255, nullable: false),
                    Format = table.Column<string>(maxLength: 20, nullable: false),
                    PubDate = table.Column<int>(nullable: false),
                    Publisher = table.Column<string>(maxLength: 255, nullable: true),
                    Isbn = table.Column<string>(maxLength: 50, nullable: true),
                    Description = table.Column<string>(maxLength: 1000, nullable: true),
                    BookCover = table.Column<string>(maxLength: 255, nullable: false),
                    Rating = table.Column<float>(nullable: false),
                    NumOfRatings = table.Column<int>(nullable: false),
                    NumOfReviews = table.Column<int>(nullable: false),
                    IsAvailable = table.Column<bool>(nullable: false),
                    Category = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BookId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    Text = table.Column<string>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Rating = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Offices",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 255, nullable: false),
                    Address = table.Column<string>(maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Offices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(nullable: true),
                    Role = table.Column<string>(nullable: true),
                    DefaultOffice = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhotoUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
            
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "DefaultOffice", "Email", "FullName", "PhoneNumber", "PhotoUrl", "Role" },
                values: new object[] { 1, "Kaunas office", "tom@email.com", "Tom Parkins", "+37019999999", "https://randomuser.me/api/portraits/men/62.jpg", "Front-end developer" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "DefaultOffice", "Email", "FullName", "PhoneNumber", "PhotoUrl", "Role" },
                values: new object[] { 2, "Vilnius office", "jim@email.com", "Jim Cornel", "+37092999999", "https://randomuser.me/api/portraits/men/60.jpg", "Full-end developer" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "DefaultOffice", "Email", "FullName", "PhoneNumber", "PhotoUrl", "Role" },
                values: new object[] { 3, "Kaunas office", "jess@email.com", "Jessica Albins", "+37099899999", "https://randomuser.me/api/portraits/women/62.jpg", "Back-end developer" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Books");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "Offices");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
