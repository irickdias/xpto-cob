namespace xpto_back.Models.DTOs
{
    public class CalculationRequest
    {
        public string TipoContrato { get; set; } = string.Empty;
        public int Atraso { get; set; }
        public decimal Valor { get; set; }
    }
}
