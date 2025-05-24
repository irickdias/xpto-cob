interface Debt{
    id: number;
    customerName: string;
    cpf: string;
    dueDate: string;
    originalAmount: string;
    contractNumber: string;
    contractType: string;
    updateDate: string | null;
    updatedAmount: string | null;
    discountAmount: string | null;
}

interface DebtsResponse {
    data: Debt[];
    totalPages: number;
    pageNumber: number;
}