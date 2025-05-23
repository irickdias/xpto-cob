using System.Globalization;
using xpto_back.Models.DTOs;

namespace xpto_back.Models.Mappers
{
    public static class DebtMapper
    {
        public static DebtFormattedDto ToDebtFormatedDto(this Debt debtModel)
        {
            var culture = new CultureInfo("pt-BR");

            return new DebtFormattedDto
            {
                Id = debtModel.Id,
                CustomerName = debtModel.CustomerName,
                Cpf = debtModel.Cpf,
                OriginalAmount = debtModel.OriginalAmount.ToString("N2", culture),
                DueDate = $"{debtModel.DueDate:dd/MM/yyyy}",
                ContractNumber = debtModel.ContractNumber,
                ContractType = debtModel.ContractType,
                UpdateDate = $"{debtModel.UpdateDate:dd/MM/yyyy}",
                UpdatedAmount = debtModel.UpdatedAmount?.ToString("N2", culture),
                DiscountAmount = debtModel.DiscountAmount?.ToString("N2", culture)
            };
        }
    }
}
