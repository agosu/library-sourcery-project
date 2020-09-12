using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryAppData.Migrations
{
    public partial class SeedingReservationsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                "Reservations",
                new[] { "Id", "LibraryId", "UserId", "BookedFrom", "ReturnDate", "PlannedReturnDate", "Rating" },
                new object[,]
                {
                    {1,2,2,"2020-05-01T11:15:00", null,"2020-05-15T11:15:00", null },
                    {2,21,1,"2020-05-01T11:15:00", null,"2020-05-15T11:15:00", null },
                    {3,4,2,"2020-05-01T11:15:00", null,"2020-05-15T11:15:00", null },
                    {4,22,3,"2020-05-01T11:15:00", null,"2020-05-15T11:15:00", null},
                    {5,23,3,"2020-05-01T11:15:00", null,"2020-05-15T11:15:00", null},
                    {6,23,1,"2020-04-30T11:15:00", null,"2020-05-14T11:15:00", null}

                }
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("TRUNCATE TABLE Reservations");
        }
    }
}
