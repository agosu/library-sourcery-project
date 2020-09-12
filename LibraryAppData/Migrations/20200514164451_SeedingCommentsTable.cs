using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryAppData.Migrations
{
    public partial class SeedingCommentsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                "Comments",
                new[] {"Id", "BookId", "UserId", "Text", "CreatedOn", "Rating"},
                new object[,]
                {
                    {1, 1, 1, "Winter is coming.", "2020-05-13T11:15:00", 0},
                    {2, 1, 2, "Lannisters always pay their debts.", "2020-04-13T11:15:00", 2},
                    {3, 2, 3, "No one.", "2020-05-08T08:15:00", 1},
                    {4, 3, 1, "Winter has come.", "2019-05-13T11:15:00", 10},
                    {5, 4, 2, "Any man who says I am the king is no true king.", "2020-01-13T23:05:00", 0},
                    {6, 5, 3, "I'm not going to stop the wheel. I'm going to break the wheel.", "2020-03-16T11:15:00", 2},
                    {7, 7, 2, "A lion doesn't concern himself with the opinions of a sheep.", "2020-04-20T13:00:00", 16},
                    {8, 8, 1, "We don't get to choose whom we love.", "2020-05-13T11:15:00", 0},
                    {9, 9, 3, "Valar Dohaeris.", "2020-02-28T14:15:00", 3},
                    {10, 9, 1, "Valar Morghulis.", "2020-02-28T15:15:00", 0},
                    {11, 10, 2, "When you play the game of thrones, you win or you die.", "2020-05-13T11:15:00", 0},
                    {12, 11, 1, "When the snows fall and the white winds blow, the lone wolf dies but the pack survives.", "2020-05-13T12:15:00", 11},
                    {13, 12, 3, "You know nothing, Jon Snow.", "2020-03-13T11:15:00", 1},
                    {14, 13, 2, "A reader lives a thousand lives before he dies. The man who doesn't read lives only one.", "2020-05-10T15:01:00", 0},
                    {15, 14, 1, "Love is the death of duty.", "2020-05-13T11:15:00", 2},
                    {16, 15, 3, "Tell them that the North remembers.", "2020-01-13T10:15:00", 0},
                    {17, 16, 3, "There is only one God and his name is Death, and there is only one thing we say to death - not today.", "2020-05-14T11:15:00", 23},
                    {18, 17, 1, "A man needs a name.", "2019-05-01T12:15:00", 1},
                    {19, 18, 2, "I will take what is mine with fire and blood.", "2020-05-13T18:15:00", 0},
                    {20, 19, 1, "The night is dark and full of terrors.", "2020-03-13T11:15:00", 5},
                    {21, 20, 1, "Hold the door.", "2020-05-10T21:15:00", 0}
                }
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData("Comments", "Id",
                new object [] {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21});
        }
    }
}
