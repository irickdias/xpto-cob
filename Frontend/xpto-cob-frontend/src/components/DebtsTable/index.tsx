
interface DebtsTableProps {
    debts: Debt[] | null;
}

export default function DebtsTable({ debts }: DebtsTableProps) {
    return (
        <table className="[&>thead]:border-b-1 [&>*>tr>td]:p-2 [&>tbody>tr:nth-child(even)]:bg-gray-100 [&>tbody>tr:nth-child(even)]:dark:bg-gray-900 w-full">
            <thead className="font-semibold text-left [&>tr>th]:p-2">
                <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Valor Original</th>
                    <th>Contrato</th>
                    <th>Tipo</th>
                    <th>Vencimento</th>
                    <th>Atualizado</th>
                    <th>Valor Atualizado</th>
                    <th>Valor Desconto</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {
                    debts ? debts.map((item: Debt, key: number) => (
                        <tr key={key}>
                            <td>{item.customerName}</td>
                            <td>{item.cpf}</td>
                            <td>R$ {item.originalAmount}</td>
                            <td>{item.contractNumber}</td>
                            <td>{item.contractType}</td>
                            <td>{item.dueDate}</td>
                            <td>{item.updateDate ? item.updateDate : '--'}</td>
                            <td>{item.updatedAmount ? `R$ ${item.updatedAmount}` : '--'}</td>
                            <td>{item.discountAmount ? `R$ ${item.discountAmount}` : '--'}</td>
                        </tr>
                    ))
                        :
                        <></>
                }
            </tbody>

        </table>
    );
}