namespace eSiroi.Resource.Entities
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class eSiroiReSrcDbContext : DbContext
    {
        public eSiroiReSrcDbContext()
            : base("name=eSiroiReSrcDbConnection")
        {
        }

        public virtual DbSet<CensusSubDivision> CensusSubDivisions { get; set; }
        public virtual DbSet<District> Districts { get; set; }
        public virtual DbSet<MajorTrans_code> MajorTrans_code { get; set; }
        public virtual DbSet<Occupation> Occupations { get; set; }
        public virtual DbSet<onlineapplication> onlineapplications { get; set; }
        public virtual DbSet<OnlineClaimant> OnlineClaimants { get; set; }
        public virtual DbSet<OnlineExecutant> OnlineExecutants { get; set; }
        public virtual DbSet<OnlineIdentifier> OnlineIdentifiers { get; set; }
        public virtual DbSet<onlinePlot> onlinePlots { get; set; }
        public virtual DbSet<PoliceStation> PoliceStations { get; set; }
        public virtual DbSet<PostOffice> PostOffices { get; set; }
        public virtual DbSet<Presentant> Presentants { get; set; }
        public virtual DbSet<State> States { get; set; }
        public virtual DbSet<TransactionStatu> TransactionStatus { get; set; }
        public virtual DbSet<censusvillage> censusvillages { get; set; }
        public virtual DbSet<Circle> Circles { get; set; }
        public virtual DbSet<Claimant> Claimants { get; set; }
        public virtual DbSet<Class> Classes { get; set; }
        public virtual DbSet<Deed> Deeds { get; set; }
        public virtual DbSet<Executant> Executants { get; set; }
        public virtual DbSet<Identifier> Identifiers { get; set; }
        public virtual DbSet<LandType> LandTypes { get; set; }
        public virtual DbSet<Plot> Plots { get; set; }
        public virtual DbSet<RegistarOffice> RegistarOffices { get; set; }
        public virtual DbSet<RevVillage> RevVillages { get; set; }
        public virtual DbSet<RO> ROes { get; set; }
        public virtual DbSet<SubDivision> SubDivisions { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CensusSubDivision>()
                .Property(e => e.DistCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<CensusSubDivision>()
                .Property(e => e.SubDivCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<CensusSubDivision>()
                .Property(e => e.SubDivName)
                .IsUnicode(false);

            modelBuilder.Entity<MajorTrans_code>()
                .Property(e => e.tran_maj_code)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<MajorTrans_code>()
                .Property(e => e.Book)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<MajorTrans_code>()
                .Property(e => e.tran_name)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<MajorTrans_code>()
                .Property(e => e.StampFee)
                .HasPrecision(18, 0);

            modelBuilder.Entity<Occupation>()
                .Property(e => e.Occupation_Name)
                .IsUnicode(false);

            modelBuilder.Entity<onlineapplication>()
                .Property(e => e.trans_maj_code)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<OnlineExecutant>()
                .Property(e => e.ExecSurName)
                .IsUnicode(false);

            modelBuilder.Entity<OnlineExecutant>()
                .Property(e => e.ExecMiddleName)
                .IsUnicode(false);

            modelBuilder.Entity<OnlineExecutant>()
                .Property(e => e.ExecLastName)
                .IsUnicode(false);

            modelBuilder.Entity<OnlineExecutant>()
                .Property(e => e.Alias)
                .IsUnicode(false);

            modelBuilder.Entity<OnlineExecutant>()
                .Property(e => e.Sex)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<OnlineExecutant>()
                .Property(e => e.FatherSurName)
                .IsUnicode(false);

            modelBuilder.Entity<OnlineExecutant>()
                .Property(e => e.FatherMiddleName)
                .IsUnicode(false);

            modelBuilder.Entity<OnlineExecutant>()
                .Property(e => e.FatherLastName)
                .IsUnicode(false);

            modelBuilder.Entity<OnlineExecutant>()
                .Property(e => e.State)
                .IsUnicode(false);

            modelBuilder.Entity<OnlineExecutant>()
                .Property(e => e.District)
                .IsUnicode(false);

            modelBuilder.Entity<OnlineExecutant>()
                .Property(e => e.SubDivision)
                .IsUnicode(false);

            modelBuilder.Entity<OnlineExecutant>()
                .Property(e => e.Circle)
                .IsUnicode(false);

            modelBuilder.Entity<OnlineExecutant>()
                .Property(e => e.Village)
                .IsUnicode(false);

            modelBuilder.Entity<OnlineExecutant>()
                .Property(e => e.Street)
                .IsUnicode(false);

            modelBuilder.Entity<OnlineExecutant>()
                .Property(e => e.PostOffice)
                .IsUnicode(false);

            modelBuilder.Entity<OnlineExecutant>()
                .Property(e => e.PoliceSt)
                .IsUnicode(false);

            modelBuilder.Entity<OnlineExecutant>()
                .Property(e => e.EnterBy)
                .IsUnicode(false);

            modelBuilder.Entity<onlinePlot>()
                .Property(e => e.DagNo)
                .IsUnicode(false);

            modelBuilder.Entity<onlinePlot>()
                .Property(e => e.PattaNo)
                .IsUnicode(false);

            modelBuilder.Entity<onlinePlot>()
                .Property(e => e.Unit)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<onlinePlot>()
                .Property(e => e.State)
                .IsUnicode(false);

            modelBuilder.Entity<onlinePlot>()
                .Property(e => e.District)
                .IsUnicode(false);

            modelBuilder.Entity<onlinePlot>()
                .Property(e => e.Subdivision)
                .IsUnicode(false);

            modelBuilder.Entity<onlinePlot>()
                .Property(e => e.Circle)
                .IsUnicode(false);

            modelBuilder.Entity<onlinePlot>()
                .Property(e => e.Village)
                .IsUnicode(false);

            modelBuilder.Entity<PoliceStation>()
                .Property(e => e.DistCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<PoliceStation>()
                .Property(e => e.SubDivCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<PoliceStation>()
                .Property(e => e.PolStation)
                .IsUnicode(false);

            modelBuilder.Entity<PostOffice>()
                .Property(e => e.DistCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<PostOffice>()
                .Property(e => e.PostOffice1)
                .IsUnicode(false);

            modelBuilder.Entity<PostOffice>()
                .Property(e => e.PinCode)
                .IsUnicode(false);

            modelBuilder.Entity<Presentant>()
                .Property(e => e.PresentSurName)
                .IsUnicode(false);

            modelBuilder.Entity<Presentant>()
                .Property(e => e.PresentMiddleName)
                .IsUnicode(false);

            modelBuilder.Entity<Presentant>()
                .Property(e => e.PresentLastName)
                .IsUnicode(false);

            modelBuilder.Entity<Presentant>()
                .Property(e => e.Alias)
                .IsUnicode(false);

            modelBuilder.Entity<Presentant>()
                .Property(e => e.Sex)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Presentant>()
                .Property(e => e.FatherSurName)
                .IsUnicode(false);

            modelBuilder.Entity<Presentant>()
                .Property(e => e.FatherMiddleName)
                .IsUnicode(false);

            modelBuilder.Entity<Presentant>()
                .Property(e => e.FatherLastName)
                .IsUnicode(false);

            modelBuilder.Entity<Presentant>()
                .Property(e => e.State)
                .IsUnicode(false);

            modelBuilder.Entity<Presentant>()
                .Property(e => e.District)
                .IsUnicode(false);

            modelBuilder.Entity<Presentant>()
                .Property(e => e.SubDivision)
                .IsUnicode(false);

            modelBuilder.Entity<Presentant>()
                .Property(e => e.Circle)
                .IsUnicode(false);

            modelBuilder.Entity<Presentant>()
                .Property(e => e.Village)
                .IsUnicode(false);

            modelBuilder.Entity<Presentant>()
                .Property(e => e.Street)
                .IsUnicode(false);

            modelBuilder.Entity<Presentant>()
                .Property(e => e.PostOffice)
                .IsUnicode(false);

            modelBuilder.Entity<Presentant>()
                .Property(e => e.PoliceSt)
                .IsUnicode(false);

            modelBuilder.Entity<Presentant>()
                .Property(e => e.EnterBy)
                .IsUnicode(false);

            modelBuilder.Entity<TransactionStatu>()
                .Property(e => e.StatusCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<TransactionStatu>()
                .Property(e => e.StatusName)
                .IsUnicode(false);

            modelBuilder.Entity<Claimant>()
                .Property(e => e.Sex)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Claimant>()
                .Property(e => e.EnterBy)
                .IsUnicode(false);

            modelBuilder.Entity<Class>()
                .Property(e => e.ClassName)
                .IsUnicode(false);

            modelBuilder.Entity<Deed>()
                .Property(e => e.MajTransCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Deed>()
                .Property(e => e.TransType)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Deed>()
                .Property(e => e.Municipal)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Deed>()
                .Property(e => e.OutJuri)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Deed>()
                .Property(e => e.VisitComm)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Deed>()
                .Property(e => e.ConValue)
                .HasPrecision(18, 0);

            modelBuilder.Entity<Deed>()
                .Property(e => e.FeeExempt)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Deed>()
                .Property(e => e.ExempReason)
                .IsUnicode(false);

            modelBuilder.Entity<Deed>()
                .Property(e => e.Paid)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Deed>()
                .Property(e => e.verified)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Deed>()
                .Property(e => e.Pending)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Deed>()
                .Property(e => e.PendingReason)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Deed>()
                .Property(e => e.Status)
                .IsUnicode(false);

            modelBuilder.Entity<Deed>()
                .Property(e => e.PaymentMode)
                .IsUnicode(false);

            modelBuilder.Entity<Deed>()
                .Property(e => e.TrDrChNo)
                .IsUnicode(false);

            modelBuilder.Entity<Deed>()
                .Property(e => e.Remark)
                .IsUnicode(false);

            modelBuilder.Entity<Deed>()
                .Property(e => e.EnterBy)
                .IsUnicode(false);

            modelBuilder.Entity<Deed>()
                .Property(e => e.Printed)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Executant>()
                .Property(e => e.ExecSurName)
                .IsUnicode(false);

            modelBuilder.Entity<Executant>()
                .Property(e => e.ExecMiddleName)
                .IsUnicode(false);

            modelBuilder.Entity<Executant>()
                .Property(e => e.ExecLastName)
                .IsUnicode(false);

            modelBuilder.Entity<Executant>()
                .Property(e => e.Alias)
                .IsUnicode(false);

            modelBuilder.Entity<Executant>()
                .Property(e => e.Sex)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Executant>()
                .Property(e => e.FatherSurName)
                .IsUnicode(false);

            modelBuilder.Entity<Executant>()
                .Property(e => e.FatherMiddleName)
                .IsUnicode(false);

            modelBuilder.Entity<Executant>()
                .Property(e => e.FatherLastName)
                .IsUnicode(false);

            modelBuilder.Entity<Executant>()
                .Property(e => e.State)
                .IsUnicode(false);

            modelBuilder.Entity<Executant>()
                .Property(e => e.District)
                .IsUnicode(false);

            modelBuilder.Entity<Executant>()
                .Property(e => e.SubDivision)
                .IsUnicode(false);

            modelBuilder.Entity<Executant>()
                .Property(e => e.Circle)
                .IsUnicode(false);

            modelBuilder.Entity<Executant>()
                .Property(e => e.Village)
                .IsUnicode(false);

            modelBuilder.Entity<Executant>()
                .Property(e => e.Street)
                .IsUnicode(false);

            modelBuilder.Entity<Executant>()
                .Property(e => e.PostOffice)
                .IsUnicode(false);

            modelBuilder.Entity<Executant>()
                .Property(e => e.PoliceSt)
                .IsUnicode(false);

            modelBuilder.Entity<Executant>()
                .Property(e => e.EnterBy)
                .IsUnicode(false);

            modelBuilder.Entity<Identifier>()
                .Property(e => e.Identify)
                .IsUnicode(false);

            modelBuilder.Entity<Identifier>()
                .Property(e => e.Sex)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Identifier>()
                .Property(e => e.EnterBy)
                .IsUnicode(false);

            modelBuilder.Entity<LandType>()
                .Property(e => e.LandTypeName)
                .IsUnicode(false);

            modelBuilder.Entity<Plot>()
                .Property(e => e.DagNo)
                .IsUnicode(false);

            modelBuilder.Entity<Plot>()
                .Property(e => e.PattaNo)
                .IsUnicode(false);

            modelBuilder.Entity<Plot>()
                .Property(e => e.TransactedArea)
                .HasPrecision(18, 6);

            modelBuilder.Entity<Plot>()
                .Property(e => e.Unit)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Plot>()
                .Property(e => e.EnterBy)
                .IsUnicode(false);

            modelBuilder.Entity<RegistarOffice>()
                .Property(e => e.RegOfficeName)
                .IsUnicode(false);

            modelBuilder.Entity<RegistarOffice>()
                .Property(e => e.Location)
                .IsUnicode(false);

            modelBuilder.Entity<RO>()
                .Property(e => e.ROName)
                .IsUnicode(false);

            modelBuilder.Entity<RO>()
                .Property(e => e.Designation)
                .IsUnicode(false);
        }
    }
}
