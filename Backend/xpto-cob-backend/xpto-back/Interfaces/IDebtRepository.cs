using Microsoft.AspNetCore.Mvc;
using xpto_back.Models;

namespace xpto_back.Interfaces
{
    public interface IDebtRepository
    {
        Task<List<Debt>> GetAll();
        Task<int> UploadCsv(IFormFile file);
        Task<int> UpdateDebts();
        Task<byte[]> ExportDebts();
    }
}
