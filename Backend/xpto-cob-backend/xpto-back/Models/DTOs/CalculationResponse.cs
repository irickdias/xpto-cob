namespace xpto_back.Models.DTOs
{
    public class CalculationResponse
    {
        public string TipoContrato { get; set; } = string.Empty;
        public int Atraso { get; set; }
        public decimal Valor { get; set; }
        public decimal ValorAtualizado { get; set; }
        public decimal DescontoMaximo { get; set; }
    }
}
