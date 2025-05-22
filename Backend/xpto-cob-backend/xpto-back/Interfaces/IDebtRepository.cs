using xpto_back.Models;

namespace xpto_back.Interfaces
{
    public interface IDebtRepository
    {
        Task<int> UploadCsv(IFormFile file);
    }
}
