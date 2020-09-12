using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryAppData.Migrations
{
	public partial class LibraryBalanceViewMigration : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.Sql(@"CREATE VIEW dbo.LibraryBalanceView 
										AS 
										SELECT l.Id
										, o.Name as OfficeName
										, o.Address as OfficeAddress
										, u.Id as AdminUserId
										, l.BookCount - ISNULL(r.BookInReadingCount, 0) as FreeBookCount
										FROM dbo.Libraries l
										INNER JOIN dbo.Offices o ON o.Id = l.OfficeId
										LEFT OUTER JOIN (
											SELECT MAX(Id) as Id, OfficeId
											FROM dbo.Users
											WHERE RoleId = 2
											GROUP BY OfficeId) u on u.OfficeId = l.OfficeId
										LEFT OUTER JOIN (
											SELECT LibraryId, COUNT(*) as BookInReadingCount
											FROM dbo.Reservations
											WHERE ReturnDate IS NULL
											GROUP BY LibraryId) r ON r.LibraryId = l.Id
											"
			 );
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.Sql(@"DROP VIEW dbo.LibraryBalanceView");

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
