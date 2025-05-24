namespace xpto_back.Helpers
{
    public class QueryObject
    {
        public string? customer { get; set; } = null;
        public string? contract { get; set; } = null;
        public string? cpf { get; set; } = null;
        public int pageNumber { get; set; } = 1;
        public int pageSize { get; set; } = 25;
    }
}
