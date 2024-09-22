IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240917144937_Initial Migration'
)
BEGIN
    CREATE TABLE [OfflineLists] (
        [Id] int NOT NULL IDENTITY,
        [UserId] nvarchar(max) NOT NULL,
        [MovieId] int NOT NULL,
        [Title] nvarchar(max) NULL,
        [Overview] nvarchar(max) NULL,
        [PosterPath] nvarchar(max) NULL,
        [ReleaseDate] datetime2 NULL,
        CONSTRAINT [PK_OfflineLists] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240917144937_Initial Migration'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240917144937_Initial Migration', N'8.0.8');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240918112125_Second_Migration'
)
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[OfflineLists]') AND [c].[name] = N'Overview');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [OfflineLists] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [OfflineLists] DROP COLUMN [Overview];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240918112125_Second_Migration'
)
BEGIN
    DECLARE @var1 sysname;
    SELECT @var1 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[OfflineLists]') AND [c].[name] = N'PosterPath');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [OfflineLists] DROP CONSTRAINT [' + @var1 + '];');
    ALTER TABLE [OfflineLists] DROP COLUMN [PosterPath];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240918112125_Second_Migration'
)
BEGIN
    DECLARE @var2 sysname;
    SELECT @var2 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[OfflineLists]') AND [c].[name] = N'ReleaseDate');
    IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [OfflineLists] DROP CONSTRAINT [' + @var2 + '];');
    ALTER TABLE [OfflineLists] DROP COLUMN [ReleaseDate];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240918112125_Second_Migration'
)
BEGIN
    DECLARE @var3 sysname;
    SELECT @var3 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[OfflineLists]') AND [c].[name] = N'Title');
    IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [OfflineLists] DROP CONSTRAINT [' + @var3 + '];');
    ALTER TABLE [OfflineLists] DROP COLUMN [Title];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240918112125_Second_Migration'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240918112125_Second_Migration', N'8.0.8');
END;
GO

COMMIT;
GO

