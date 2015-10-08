namespace eSiroi.Resource.eSiroiResourceMigration
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ackno_type_changed : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.OnlineClaimant");
            DropPrimaryKey("dbo.OnlineExecutant");
            DropPrimaryKey("dbo.OnlineIdentifier");
            DropPrimaryKey("dbo.onlinePlot");
            AlterColumn("dbo.OnlineClaimant", "Ackno", c => c.String(nullable: false, maxLength: 50));
            AlterColumn("dbo.OnlineExecutant", "Ackno", c => c.String(nullable: false, maxLength: 50));
            AlterColumn("dbo.OnlineIdentifier", "Ackno", c => c.String(nullable: false, maxLength: 50));
            AlterColumn("dbo.onlinePlot", "ackno", c => c.String(nullable: false, maxLength: 50));
            AddPrimaryKey("dbo.OnlineClaimant", new[] { "Ackno", "SlNo" });
            AddPrimaryKey("dbo.OnlineExecutant", new[] { "Ackno", "SlNo" });
            AddPrimaryKey("dbo.OnlineIdentifier", new[] { "Ackno", "SlNo" });
            AddPrimaryKey("dbo.onlinePlot", "ackno");
        }
        
        public override void Down()
        {
            DropPrimaryKey("dbo.onlinePlot");
            DropPrimaryKey("dbo.OnlineIdentifier");
            DropPrimaryKey("dbo.OnlineExecutant");
            DropPrimaryKey("dbo.OnlineClaimant");
            AlterColumn("dbo.onlinePlot", "ackno", c => c.Int(nullable: false));
            AlterColumn("dbo.OnlineIdentifier", "Ackno", c => c.Int(nullable: false));
            AlterColumn("dbo.OnlineExecutant", "Ackno", c => c.Int(nullable: false));
            AlterColumn("dbo.OnlineClaimant", "Ackno", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.onlinePlot", "ackno");
            AddPrimaryKey("dbo.OnlineIdentifier", new[] { "Ackno", "SlNo" });
            AddPrimaryKey("dbo.OnlineExecutant", new[] { "Ackno", "SlNo" });
            AddPrimaryKey("dbo.OnlineClaimant", new[] { "Ackno", "SlNo" });
        }
    }
}
