using Microsoft.AspNetCore.Mvc;
using xpto_back.Helpers;
using xpto_back.Models;
using xpto_back.Models.DTOs;

namespace xpto_back.Interfaces
{
    public interface IDebtRepository
    {
        Task<PaginatedList<DebtFormattedDto>> GetAll(QueryObject query);
        Task<int> UploadCsv(IFormFile file);
        Task<int> UpdateDebts();
        Task<byte[]> ExportDebts();
    }
}
