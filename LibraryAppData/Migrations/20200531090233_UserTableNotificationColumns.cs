using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryAppData.Migrations
{
    public partial class UserTableNotificationColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AppNotiOnBookAvailable",
                table: "Users",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<bool>(
                name: "AppNotiOnNewBook",
                table: "Users",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<bool>(
                name: "AppNotiOnReturnDate",
                table: "Users",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<bool>(
                name: "EmailNotiOnBookAvailable",
                table: "Users",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<bool>(
                name: "EmailNotiOnReturnDate",
                table: "Users",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AlterColumn<int>(
                name: "Rating",
                table: "Reservations",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AppNotiOnBookAvailable", "AppNotiOnNewBook", "AppNotiOnReturnDate", "EmailNotiOnBookAvailable", "EmailNotiOnReturnDate" },
                values: new object[] { true, true, true, true, true });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "AppNotiOnBookAvailable", "AppNotiOnNewBook", "AppNotiOnReturnDate", "EmailNotiOnBookAvailable", "EmailNotiOnReturnDate" },
                values: new object[] { true, true, true, true, true });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "AppNotiOnBookAvailable", "AppNotiOnNewBook", "AppNotiOnReturnDate", "EmailNotiOnBookAvailable", "EmailNotiOnReturnDate" },
                values: new object[] { true, true, true, true, true });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppNotiOnBookAvailable",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AppNotiOnNewBook",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AppNotiOnReturnDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EmailNotiOnBookAvailable",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EmailNotiOnReturnDate",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "Rating",
                table: "Reservations",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
