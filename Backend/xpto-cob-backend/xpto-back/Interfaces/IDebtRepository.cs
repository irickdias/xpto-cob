using Microsoft.AspNetCore.Mvc;
using xpto_back.Models;
using xpto_back.Models.DTOs;

namespace xpto_back.Interfaces
{
    public interface IDebtRepository
    {
        Task<List<DebtFormattedDto>> GetAll();
        Task<int> UploadCsv(IFormFile file);
        Task<int> UpdateDebts();
        Task<byte[]> ExportDebts();
    }
}
