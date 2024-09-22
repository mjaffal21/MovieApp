using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Second_Migration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Overview",
                table: "OfflineLists");

            migrationBuilder.DropColumn(
                name: "PosterPath",
                table: "OfflineLists");

            migrationBuilder.DropColumn(
                name: "ReleaseDate",
                table: "OfflineLists");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "OfflineLists");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Overview",
                table: "OfflineLists",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PosterPath",
                table: "OfflineLists",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReleaseDate",
                table: "OfflineLists",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "OfflineLists",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
