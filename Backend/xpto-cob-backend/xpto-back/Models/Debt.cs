using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace xpto_back.Models
{
    [Table("Debts")]
    public class Debt
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(11)]
        public string Cpf { get; set; } = string.Empty;

        [Required]
        [StringLength(150)]
        public string CustomerName { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string ContractNumber { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Date)]
        public DateTime DueDate { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal OriginalAmount { get; set; }

        [Required]
        [StringLength(50)]
        public string ContractType { get; set; } = string.Empty;

        [DataType(DataType.Date)]
        public DateTime? UpdateDate { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? UpdatedAmount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? DiscountAmount { get; set; }

    }
}
