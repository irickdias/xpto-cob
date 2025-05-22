'use client'

import { useRef, useState } from "react";
import { toast } from "react-toastify";

type DebtRow = {
    cpf: string;
    customer: string;
    contract: string;
    dueDate: string;
    amount: string;
    contractType: string;
};

export default function HandleFiles() {
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
    };

    const handleDivClick = () => {
        inputRef.current?.click();
    };

    const handleUploadCsv = async () => {
        console.log("teste entrou");

        const formData = new FormData();
        formData.append('file', file!);
        console.log("teste file", file);

        try {
            const loadingToast = toast.loading("Importando dados...");
            
            const response = await fetch('https://localhost:7249/xpto/debt/upload', {
                method: 'POST',
                body: formData,
            });

            console.log("teste response", response)

            toast.dismiss(loadingToast);

            if (response.ok) {
                toast.success("Subrocesso cadastrado!");
                setFile(null);
            }
            else {
                toast.error("Erro ao importar arquivo. Verique o arquivo e tente novamente");
            }
            
            // const data = await response.json();
        } catch (error) {
            console.error('Erro ao enviar arquivo:', error);
            toast.error("Erro ao importar arquivo. Verique o arquivo e tente novamente");
        }
    }
    // max-w-md mx-auto mt-10 space-y-4

    return (
        <div className="w-full space-y-4">
            <p className="">Importar arquivo CSV de dívidas</p>
            <div
                onClick={handleDivClick}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-primary/80 rounded p-6 text-center text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-900 transition-all"
            >
                <p>Arraste e solte um arquivo <em className="text-green-600">CSV</em> aqui ou clique para selecionar</p>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    ref={inputRef}
                    className="hidden"
                />
            </div>

            {file && (
                <div>
                    <div className="flex items-center justify-between p-2 rounded-sm border border-primary/80">
                        <span>{file.name}</span>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleRemoveFile}
                                className="text-red-500 hover:text-red-700 text-sm hover:cursor-pointer"
                            >
                                Remover
                            </button>

                            <button
                                onClick={handleUploadCsv}
                                className="text-green-500 hover:text-green-700 text-sm hover:cursor-pointer"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>


            )}

            <p>Preview</p>
        </div>
    );
}