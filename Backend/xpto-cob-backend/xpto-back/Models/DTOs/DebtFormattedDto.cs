using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace xpto_back.Models.DTOs
{
    public class DebtFormattedDto
    {
        public int Id { get; set; }

        public string Cpf { get; set; } = string.Empty;

        public string CustomerName { get; set; } = string.Empty;

        public string ContractNumber { get; set; } = string.Empty;

        public string DueDate { get; set; } = string.Empty;

        public string OriginalAmount { get; set; } = string.Empty;

        public string ContractType { get; set; } = string.Empty;

        public string? UpdateDate { get; set; }

        public string? UpdatedAmount { get; set; }

        public string? DiscountAmount { get; set; }
    }
}
