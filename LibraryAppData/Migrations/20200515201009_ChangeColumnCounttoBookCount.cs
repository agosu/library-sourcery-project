using LibraryAppData.Models;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryAppData.Migrations
{
    public partial class ChangeColumnCounttoBookCount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.RenameColumn(name: "Count", table: "Libraries", newName: "BookCount");
            migrationBuilder.AlterColumn<Library>(name: "BookCount", table: "Libraries", type: "int", oldType: "bigint");
            migrationBuilder.RenameColumn(name: "CreatedById", table: "Libraries", newName: "CreatedBy");
            migrationBuilder.RenameColumn(name: "UpdatedById", table: "Libraries", newName: "UpdatedBy");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(name: "CreatedBy", table: "Libraries", newName: "CreatedById");
            migrationBuilder.RenameColumn(name: "UpdatedBy", table: "Libraries", newName: "UpdatedById");
            migrationBuilder.AlterColumn<Library>(name: "BookCount", table: "Libraries", type: "bigint", oldType: "int");
            migrationBuilder.RenameColumn(name: "BookCount", table: "Libraries", newName: "Count");
        }
    }
}
