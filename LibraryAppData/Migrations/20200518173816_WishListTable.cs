using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryAppData.Migrations
{
    public partial class WishListTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WishList",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 255, nullable: false),
                    Author = table.Column<string>(nullable: false),
                    ImageUrl = table.Column<string>(nullable: false),
                    Isbn = table.Column<string>(maxLength: 50, nullable: true),
                    PubDate = table.Column<int>(nullable: false),
                    Description = table.Column<string>(maxLength: 1000, nullable: true),
                    UserId = table.Column<int>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Rating = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WishList", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WishList_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WishList_UserId",
                table: "WishList",
                column: "UserId");

            migrationBuilder.InsertData(
                "WishList",
                new[] {"Id", "Title", "Author", "ImageUrl", "Isbn", "PubDate", "Description", "UserId", "CreatedOn", "Rating"},
                new object[,]
                {
                    {
                        1, "Practical Object Oriented Design in Ruby", "Sandi Metz", "http://covers.openlibrary.org/b/isbn/0321721330-L.jpg", "0321721330", 2012,
                        "The Complete Guide to Writing More Maintainable, Manageable, Pleasing, and Powerful Ruby Applications Ruby's widely admired ease of use has a downside: Too many Ruby and Rails applications have been created without concern for their long-term maintenance or evolution.",
                        1, "2020-05-15T15:20:00", 0
                    },
                    {
                        2, "Pro Git", "Scott Chacon", "http://covers.openlibrary.org/b/isbn/1430218339-L.jpg", "1430218339", 2009,
                        "Git is the version control system developed by Linus Torvalds for Linux kernel development. It took the open source world by storm since its inception in 2005, and is used by small development shops and giants like Google, Red Hat, and IBM, and of course many open source projects.",
                        2, "2020-05-16T20:12:14", 0
                    }
                }
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WishList");
        }
    }
}
