namespace xpto_back.Models
{
    public class Debt
    {
        public int Id { get; set; }
        public string Cpf { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string ContractNumber { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
        public decimal OriginalAmount { get; set; }
        public string ContractType { get; set; } = string.Empty;
        public DateTime? UpdateDate { get; set; }
        public decimal? UpdatedAmount { get; set; }
        public decimal? DiscountAmount { get; set; }

    }
}
