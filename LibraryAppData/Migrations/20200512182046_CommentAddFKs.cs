using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryAppData.Migrations
{
    public partial class CommentAddFKs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddForeignKey(
                "User",
                "Comments",
                "UserId",
                "Users",
                "dbo",
                "dbo",
                "Id"
                );
            
            migrationBuilder.AddForeignKey(
                "Book",
                "Comments",
                "BookId",
                "Books",
                "dbo",
                "dbo",
                "Id"
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey("User", "Comments");
            migrationBuilder.DropForeignKey("Book", "Comments");
        }
    }
}
