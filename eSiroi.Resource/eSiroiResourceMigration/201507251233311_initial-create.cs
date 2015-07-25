namespace eSiroi.Resource.eSiroiResourceMigration
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initialcreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CensusSubDivision",
                c => new
                    {
                        DistCode = c.String(nullable: false, maxLength: 2, fixedLength: true, unicode: false),
                        SubDivCode = c.String(nullable: false, maxLength: 3, fixedLength: true, unicode: false),
                        SubDivName = c.String(nullable: false, maxLength: 40, unicode: false),
                    })
                .PrimaryKey(t => new { t.DistCode, t.SubDivCode, t.SubDivName });
            
            CreateTable(
                "dbo.censusvillage",
                c => new
                    {
                        DistCode = c.String(nullable: false, maxLength: 2),
                        SubDivCode = c.String(nullable: false, maxLength: 2),
                        VillCode = c.String(nullable: false, maxLength: 50),
                        VillName = c.String(nullable: false, maxLength: 50),
                        CircleCode = c.String(maxLength: 50),
                        TRU = c.String(maxLength: 255),
                    })
                .PrimaryKey(t => new { t.DistCode, t.SubDivCode, t.VillCode, t.VillName });
            
            CreateTable(
                "dbo.Circle",
                c => new
                    {
                        CircleCode = c.String(nullable: false, maxLength: 3),
                        CircleName = c.String(nullable: false, maxLength: 50),
                        DistCode = c.String(maxLength: 3),
                        SubDivCode = c.String(maxLength: 3),
                    })
                .PrimaryKey(t => new { t.CircleCode, t.CircleName });
            
            CreateTable(
                "dbo.Claimant",
                c => new
                    {
                        TSNo = c.Int(nullable: false),
                        TSYear = c.Short(nullable: false),
                        SlNo = c.Short(nullable: false),
                        ClaimSurName = c.String(maxLength: 30),
                        ClaimMiddleName = c.String(maxLength: 50),
                        ClaimLastName = c.String(maxLength: 50),
                        Alias = c.String(maxLength: 50),
                        Sex = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        Occupation = c.Short(),
                        FatherSurName = c.String(maxLength: 50),
                        FatherMiddleName = c.String(maxLength: 50),
                        FatherLastName = c.String(maxLength: 50),
                        State = c.String(maxLength: 50),
                        District = c.String(maxLength: 50),
                        SubDivision = c.String(maxLength: 50),
                        Circle = c.String(maxLength: 50),
                        Village = c.String(maxLength: 50),
                        Street = c.String(maxLength: 50),
                        PostOffice = c.String(maxLength: 50),
                        PinCode = c.Int(),
                        PoliceSt = c.String(maxLength: 50),
                        EnterBy = c.String(maxLength: 15, unicode: false),
                    })
                .PrimaryKey(t => new { t.TSNo, t.TSYear, t.SlNo });
            
            CreateTable(
                "dbo.Class",
                c => new
                    {
                        ClassCode = c.Short(nullable: false),
                        ClassName = c.String(nullable: false, maxLength: 20, unicode: false),
                    })
                .PrimaryKey(t => new { t.ClassCode, t.ClassName });
            
            CreateTable(
                "dbo.Deed",
                c => new
                    {
                        TSNo = c.Int(nullable: false),
                        TSYear = c.Short(nullable: false),
                        RegNo = c.Int(),
                        RegYear = c.Short(),
                        RegDate = c.DateTime(),
                        MajTransCode = c.String(maxLength: 2, fixedLength: true, unicode: false),
                        TransType = c.String(maxLength: 2, fixedLength: true, unicode: false),
                        SR = c.Int(),
                        Date_Exec = c.DateTime(),
                        Date_Time_Present = c.DateTime(),
                        Municipal = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        OutJuri = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        VisitComm = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        ConValue = c.Decimal(precision: 18, scale: 0, storeType: "numeric"),
                        StampPaid = c.Int(),
                        FeeExempt = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        ExempReason = c.String(maxLength: 50, unicode: false),
                        TotalRegFeePaid = c.Int(),
                        RegFee = c.Int(),
                        JuriFee = c.Int(),
                        CommFee = c.Int(),
                        Paid = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        verified = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        Pending = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        PendingReason = c.String(maxLength: 2, fixedLength: true, unicode: false),
                        Status = c.String(maxLength: 50, unicode: false),
                        PaymentMode = c.String(maxLength: 10, unicode: false),
                        TrDrChNo = c.String(maxLength: 15, unicode: false),
                        TrDrChDate = c.DateTime(),
                        Remark = c.String(maxLength: 100, unicode: false),
                        EnterBy = c.String(maxLength: 15, unicode: false),
                        Printed = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        EntryDt = c.DateTime(),
                    })
                .PrimaryKey(t => new { t.TSNo, t.TSYear });
            
            CreateTable(
                "dbo.District",
                c => new
                    {
                        DistCode = c.String(nullable: false, maxLength: 2),
                        DistName = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.DistCode);
            
            CreateTable(
                "dbo.Executant",
                c => new
                    {
                        TSNo = c.Int(nullable: false),
                        TSYear = c.Short(nullable: false),
                        SlNo = c.Short(nullable: false),
                        ExecSurName = c.String(maxLength: 50, unicode: false),
                        ExecMiddleName = c.String(maxLength: 50, unicode: false),
                        ExecLastName = c.String(maxLength: 50, unicode: false),
                        Alias = c.String(maxLength: 50, unicode: false),
                        Sex = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        Occupation = c.Short(),
                        FatherSurName = c.String(maxLength: 50, unicode: false),
                        FatherMiddleName = c.String(maxLength: 50, unicode: false),
                        FatherLastName = c.String(maxLength: 50, unicode: false),
                        State = c.String(maxLength: 50, unicode: false),
                        District = c.String(maxLength: 50, unicode: false),
                        SubDivision = c.String(maxLength: 50, unicode: false),
                        Circle = c.String(maxLength: 50, unicode: false),
                        Village = c.String(maxLength: 50, unicode: false),
                        Street = c.String(maxLength: 150, unicode: false),
                        PostOffice = c.String(maxLength: 150, unicode: false),
                        PinCode = c.Int(),
                        PoliceSt = c.String(maxLength: 100, unicode: false),
                        EnterBy = c.String(maxLength: 15, unicode: false),
                    })
                .PrimaryKey(t => new { t.TSNo, t.TSYear, t.SlNo });
            
            CreateTable(
                "dbo.Identifier",
                c => new
                    {
                        TSNo = c.Int(nullable: false),
                        TSYear = c.Short(nullable: false),
                        SlNo = c.Short(nullable: false),
                        IdentSurName = c.String(maxLength: 50),
                        IdentMiddleName = c.String(maxLength: 50),
                        IdentLastName = c.String(maxLength: 50),
                        Alias = c.String(maxLength: 50),
                        Identify = c.String(maxLength: 10, unicode: false),
                        Sex = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        Occupation = c.Short(),
                        FatherSurName = c.String(maxLength: 50),
                        FatherMiddleName = c.String(maxLength: 50),
                        FatherLastName = c.String(maxLength: 50),
                        State = c.String(maxLength: 50),
                        District = c.String(maxLength: 50),
                        SubDivision = c.String(maxLength: 50),
                        Circle = c.String(maxLength: 50),
                        Village = c.String(maxLength: 50),
                        Street = c.String(maxLength: 150),
                        PostOffice = c.String(maxLength: 150),
                        PinCode = c.Int(),
                        PoliceSt = c.String(maxLength: 150),
                        EnterBy = c.String(maxLength: 15, unicode: false),
                    })
                .PrimaryKey(t => new { t.TSNo, t.TSYear, t.SlNo });
            
            CreateTable(
                "dbo.LandType",
                c => new
                    {
                        LandTypeCode = c.Short(nullable: false),
                        LandTypeName = c.String(maxLength: 30, unicode: false),
                    })
                .PrimaryKey(t => t.LandTypeCode);
            
            CreateTable(
                "dbo.MajorTrans_code",
                c => new
                    {
                        tran_maj_code = c.String(nullable: false, maxLength: 2, fixedLength: true, unicode: false),
                        tran_name = c.String(nullable: false, maxLength: 80, fixedLength: true, unicode: false),
                        Book = c.String(maxLength: 4, fixedLength: true, unicode: false),
                        StampFee = c.Decimal(precision: 18, scale: 0, storeType: "numeric"),
                    })
                .PrimaryKey(t => new { t.tran_maj_code, t.tran_name });
            
            CreateTable(
                "dbo.Occupation",
                c => new
                    {
                        Occupation_Code = c.Short(nullable: false),
                        Occupation_Name = c.String(nullable: false, maxLength: 30, unicode: false),
                    })
                .PrimaryKey(t => t.Occupation_Code);
            
            CreateTable(
                "dbo.onlineapplication",
                c => new
                    {
                        ackno = c.Int(nullable: false),
                        year = c.String(nullable: false, maxLength: 50),
                        sro = c.String(nullable: false, maxLength: 50),
                        mobile = c.String(maxLength: 50),
                        aadhar = c.String(maxLength: 50),
                        trans_maj_code = c.String(maxLength: 2, fixedLength: true, unicode: false),
                        password = c.String(maxLength: 50),
                        date = c.String(maxLength: 50),
                        status = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => new { t.ackno, t.year, t.sro });
            
            CreateTable(
                "dbo.OnlineClaimant",
                c => new
                    {
                        Ackno = c.Int(nullable: false),
                        SlNo = c.Short(nullable: false),
                        ClaimSurName = c.String(maxLength: 50),
                        ClaimMiddleName = c.String(maxLength: 50),
                        ClaimLastName = c.String(maxLength: 50),
                        Alias = c.String(maxLength: 50),
                        Sex = c.String(maxLength: 1),
                        Occupation = c.Short(),
                        FatherSurName = c.String(maxLength: 50),
                        FatherMiddleName = c.String(maxLength: 50),
                        FatherLastName = c.String(maxLength: 50),
                        State = c.String(maxLength: 50),
                        District = c.String(maxLength: 50),
                        SubDivision = c.String(maxLength: 50),
                        Circle = c.String(maxLength: 50),
                        Village = c.String(maxLength: 50),
                        Street = c.String(maxLength: 150),
                        PostOffice = c.String(maxLength: 150),
                        PinCode = c.Int(),
                        PoliceSt = c.String(maxLength: 100),
                    })
                .PrimaryKey(t => new { t.Ackno, t.SlNo });
            
            CreateTable(
                "dbo.OnlineExecutant",
                c => new
                    {
                        Ackno = c.Int(nullable: false),
                        SlNo = c.Short(nullable: false),
                        ExecSurName = c.String(maxLength: 50, unicode: false),
                        ExecMiddleName = c.String(maxLength: 50, unicode: false),
                        ExecLastName = c.String(maxLength: 50, unicode: false),
                        Alias = c.String(maxLength: 50, unicode: false),
                        Sex = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        Occupation = c.Short(),
                        FatherSurName = c.String(maxLength: 50, unicode: false),
                        FatherMiddleName = c.String(maxLength: 50, unicode: false),
                        FatherLastName = c.String(maxLength: 50, unicode: false),
                        State = c.String(maxLength: 50, unicode: false),
                        District = c.String(maxLength: 50, unicode: false),
                        SubDivision = c.String(maxLength: 50, unicode: false),
                        Circle = c.String(maxLength: 50, unicode: false),
                        Village = c.String(maxLength: 50, unicode: false),
                        Street = c.String(maxLength: 150, unicode: false),
                        PostOffice = c.String(maxLength: 150, unicode: false),
                        PinCode = c.Int(),
                        PoliceSt = c.String(maxLength: 100, unicode: false),
                        EnterBy = c.String(maxLength: 15, unicode: false),
                    })
                .PrimaryKey(t => new { t.Ackno, t.SlNo });
            
            CreateTable(
                "dbo.OnlineIdentifier",
                c => new
                    {
                        Ackno = c.Int(nullable: false),
                        SlNo = c.Short(nullable: false),
                        IdentSurName = c.String(maxLength: 50),
                        IdentMiddleName = c.String(maxLength: 50),
                        IdentLastName = c.String(maxLength: 50),
                        Alias = c.String(maxLength: 50),
                        Identify = c.String(maxLength: 10),
                        Sex = c.String(maxLength: 1),
                        Occupation = c.Short(),
                        FatherSurName = c.String(maxLength: 50),
                        FatherMiddleName = c.String(maxLength: 50),
                        FatherLastName = c.String(maxLength: 50),
                        State = c.String(maxLength: 50),
                        District = c.String(maxLength: 50),
                        SubDivision = c.String(maxLength: 50),
                        Circle = c.String(maxLength: 50),
                        Village = c.String(maxLength: 50),
                        Street = c.String(maxLength: 150),
                        PostOffice = c.String(maxLength: 150),
                        PinCode = c.Int(),
                        PoliceSt = c.String(maxLength: 100),
                    })
                .PrimaryKey(t => new { t.Ackno, t.SlNo });
            
            CreateTable(
                "dbo.onlinePlot",
                c => new
                    {
                        ackno = c.Int(nullable: false),
                        DagNo = c.String(maxLength: 25, unicode: false),
                        PattaNo = c.String(maxLength: 25, unicode: false),
                        LandType = c.Short(),
                        Class = c.Short(),
                        Unit = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        State = c.String(maxLength: 30, unicode: false),
                        District = c.String(maxLength: 30, unicode: false),
                        Subdivision = c.String(maxLength: 30, unicode: false),
                        Circle = c.String(maxLength: 30, unicode: false),
                        Village = c.String(maxLength: 30, unicode: false),
                        TransactedArea = c.Decimal(precision: 18, scale: 2, storeType: "numeric"),
                        address1 = c.String(maxLength: 30),
                        address2 = c.String(maxLength: 30),
                        address3 = c.String(maxLength: 30),
                    })
                .PrimaryKey(t => t.ackno);
            
            CreateTable(
                "dbo.Plot",
                c => new
                    {
                        SlNo = c.Int(nullable: false),
                        TSNo = c.Int(nullable: false),
                        TSYear = c.Short(nullable: false),
                        PattaNo = c.String(nullable: false, maxLength: 25, unicode: false),
                        DagNo = c.String(maxLength: 25, unicode: false),
                        LandType = c.Short(),
                        Class = c.Short(),
                        SqFeet = c.String(maxLength: 25),
                        TransactedArea = c.Decimal(precision: 18, scale: 6, storeType: "numeric"),
                        Unit = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        State = c.String(maxLength: 30),
                        District = c.String(maxLength: 50),
                        Subdivision = c.String(maxLength: 50),
                        Circle = c.String(maxLength: 50),
                        Village = c.String(maxLength: 50),
                        EnterBy = c.String(maxLength: 15, unicode: false),
                    })
                .PrimaryKey(t => new { t.SlNo, t.TSNo, t.TSYear, t.PattaNo });
            
            CreateTable(
                "dbo.PoliceStation",
                c => new
                    {
                        PolStation = c.String(nullable: false, maxLength: 40, unicode: false),
                        DistCode = c.String(nullable: false, maxLength: 2, fixedLength: true, unicode: false),
                        SubDivCode = c.String(maxLength: 2, fixedLength: true, unicode: false),
                    })
                .PrimaryKey(t => t.PolStation);
            
            CreateTable(
                "dbo.PostOffice",
                c => new
                    {
                        PostOffice = c.String(nullable: false, maxLength: 40, unicode: false),
                        DistCode = c.String(nullable: false, maxLength: 2, fixedLength: true, unicode: false),
                        PinCode = c.String(nullable: false, maxLength: 6, unicode: false),
                    })
                .PrimaryKey(t => t.PostOffice);
            
            CreateTable(
                "dbo.Presentant",
                c => new
                    {
                        TSNo = c.Int(nullable: false),
                        TSYear = c.Short(nullable: false),
                        SlNo = c.Short(nullable: false),
                        PresentSurName = c.String(maxLength: 50, unicode: false),
                        PresentMiddleName = c.String(maxLength: 50, unicode: false),
                        PresentLastName = c.String(maxLength: 50, unicode: false),
                        Alias = c.String(maxLength: 50, unicode: false),
                        Sex = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        Occupation = c.Short(),
                        FatherSurName = c.String(maxLength: 50, unicode: false),
                        FatherMiddleName = c.String(maxLength: 50, unicode: false),
                        FatherLastName = c.String(maxLength: 50, unicode: false),
                        State = c.String(maxLength: 50, unicode: false),
                        District = c.String(maxLength: 50, unicode: false),
                        SubDivision = c.String(maxLength: 50, unicode: false),
                        Circle = c.String(maxLength: 50, unicode: false),
                        Village = c.String(maxLength: 50, unicode: false),
                        Street = c.String(maxLength: 150, unicode: false),
                        PostOffice = c.String(maxLength: 150, unicode: false),
                        PinCode = c.Int(),
                        PoliceSt = c.String(maxLength: 100, unicode: false),
                        EnterBy = c.String(maxLength: 15, unicode: false),
                    })
                .PrimaryKey(t => new { t.TSNo, t.TSYear, t.SlNo });
            
            CreateTable(
                "dbo.RegistarOffice",
                c => new
                    {
                        RegOfficeCode = c.Short(nullable: false),
                        RegOfficeName = c.String(nullable: false, maxLength: 40, unicode: false),
                        Location = c.String(maxLength: 40, unicode: false),
                    })
                .PrimaryKey(t => new { t.RegOfficeCode, t.RegOfficeName });
            
            CreateTable(
                "dbo.RevVillage",
                c => new
                    {
                        VillCode = c.String(nullable: false, maxLength: 10),
                        VillName = c.String(nullable: false, maxLength: 50),
                        DistCode = c.String(maxLength: 2),
                        SubDivCode = c.String(maxLength: 2),
                        CircleCode = c.String(maxLength: 10),
                    })
                .PrimaryKey(t => new { t.VillCode, t.VillName });
            
            CreateTable(
                "dbo.RO",
                c => new
                    {
                        ROCode = c.Int(nullable: false),
                        OfficeCode = c.Short(nullable: false),
                        ROName = c.String(nullable: false, maxLength: 30, unicode: false),
                        Designation = c.String(nullable: false, maxLength: 20, unicode: false),
                        St_Date = c.DateTime(),
                        End_Date = c.DateTime(),
                        Address = c.String(),
                    })
                .PrimaryKey(t => new { t.ROCode, t.OfficeCode, t.ROName, t.Designation });
            
            CreateTable(
                "dbo.State",
                c => new
                    {
                        StateCode = c.Double(nullable: false),
                        StateName = c.String(maxLength: 40),
                    })
                .PrimaryKey(t => t.StateCode);
            
            CreateTable(
                "dbo.SubDivision",
                c => new
                    {
                        DistCode = c.String(nullable: false, maxLength: 2),
                        SubDivCode = c.String(nullable: false, maxLength: 2),
                        SubDivName = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => new { t.DistCode, t.SubDivCode, t.SubDivName });
            
            CreateTable(
                "dbo.TransactionStatus",
                c => new
                    {
                        StatusCode = c.String(nullable: false, maxLength: 1, fixedLength: true, unicode: false),
                        StatusName = c.String(maxLength: 50, unicode: false),
                    })
                .PrimaryKey(t => t.StatusCode);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.TransactionStatus");
            DropTable("dbo.SubDivision");
            DropTable("dbo.State");
            DropTable("dbo.RO");
            DropTable("dbo.RevVillage");
            DropTable("dbo.RegistarOffice");
            DropTable("dbo.Presentant");
            DropTable("dbo.PostOffice");
            DropTable("dbo.PoliceStation");
            DropTable("dbo.Plot");
            DropTable("dbo.onlinePlot");
            DropTable("dbo.OnlineIdentifier");
            DropTable("dbo.OnlineExecutant");
            DropTable("dbo.OnlineClaimant");
            DropTable("dbo.onlineapplication");
            DropTable("dbo.Occupation");
            DropTable("dbo.MajorTrans_code");
            DropTable("dbo.LandType");
            DropTable("dbo.Identifier");
            DropTable("dbo.Executant");
            DropTable("dbo.District");
            DropTable("dbo.Deed");
            DropTable("dbo.Class");
            DropTable("dbo.Claimant");
            DropTable("dbo.Circle");
            DropTable("dbo.censusvillage");
            DropTable("dbo.CensusSubDivision");
        }
    }
}
