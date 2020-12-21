# Open Mob Timer
Your free, open source Mob Timer for remote teams.

Open Mob timer isn't just any mob timer. Nope! This one integrates socket.io to keep everyone in the loop while still keeping it simple. 

Create a team, then copy the link to share with your team members. Everyone with the link can keep an eye on the timer without having to rely on Jerry G to remember to start the timer between drivers. Dang it, Jerry!

![Demo](mobtimerdemo2.gif)

## Development
### Pre-requisites
- [Node.js](https://nodejs.org/en/download/)
- [Angular CLI](https://cli.angular.io/)
- [Microsoft SQL Server Express 2019](https://www.microsoft.com/en-us/Download/details.aspx?id=101064)
- [SQL Server Management Studio 2019](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15) (Optional)

### NPM Scripts
- `npm run start:client` - Starts the Angular app
- `npm run start:server` - Starts Express
- `npm run build` - Builds everything (Angular and Express)
- `npm run build:prod` - Builds everything in production mode
- `npm run typeorm` - Runs TypeORM commands. E.g., `npm run typeorm -- migration:run`
### Running the Application Locally
- Complete [First Time Setup](#first-time-setup)
- `npm run start:client`
- `npm run start:server`

## [First Time Setup](#first-time-setup)
### Install Node Modules
- `npm install`
There's some configuration to do before the app can be run locally.
### SQL Server Express and Database Initialization
The following steps should only need to be performed for first time setup.
#### Enable SQL Server Browsing
1. Open **Services**
1. Find the **SQL Server Browser** service and right-click it
1. Click **Properties**
1. Select **Automatic** from the **Startup Type** dropdown
1. Click **Start** if the service is not yet running
1. Click **Apply**
1. Click **OK**
1. Open **SQL Server 2019 Configuration Manager** (_this installs with SQL Server Express_)
1. Select **SQL Server Services** in the left pane
1. Start the following services if they're not running:
    1. SQL Server (SQLEXPRESS)
    1. SQL Server Browser

#### Enable TCP/IP
1. Open **SQL Server 2019 Configuration Manager** (_this installs with SQL Server Express_)
1. Expand **SQL Server Network Configuration** in the left pane
1. Select **Protocols for SQLEXPRESS**
1. If **TCP/IP** is disabled, right-click it then click **Enable**

#### Enable SQL Server Authentication
This can alternatively be done [using SSMS](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/change-server-authentication-mode?view=sql-server-ver15)

```sql
USE [master]
GO
EXEC xp_instance_regwrite N'HKEY_LOCAL_MACHINE', 
     N'Software\Microsoft\MSSQLServer\MSSQLServer',
     N'LoginMode', REG_DWORD, 2
GO
```

#### Setup the Database
1. Choose a password you want to use for the mobtimer database user
1. Set the value of the password on the `TYPEORM_PASSWORD` environment variable
1. Set the value of the password on the `@password` variable in the SQL below
1. Excute the SQL

```sql
DECLARE @password VARCHAR(100)
-- Edit the line below. The query will fail if a value is not set
SET @password = 
-- Example: SET @password = 'password'
USE master
IF NOT EXISTS (
     SELECT name FROM master.dbo.sysdatabases 
     WHERE name = N'mobtimer')
BEGIN
    CREATE DATABASE mobtimer
END
GO

IF NOT EXISTS (
    SELECT name FROM master.dbo.syslogins 
    WHERE name = 'mtadmin' and dbname = 'mobtimer')
BEGIN
    CREATE LOGIN mtadmin 
    WITH PASSWORD = @password
END
GO

USE mobtimer
GO
IF NOT EXISTS (
    SELECT * FROM sys.database_principals 
    WHERE name = N'mtadmin')
BEGIN
    CREATE USER [mtadmin] FOR LOGIN [mtadmin]
    EXEC sp_addrolemember N'db_owner', N'mtadmin'
END
GO
```

#### Run the Migrations
`cd` into the project folder and run `npm run typeorm -- migrations:run`
