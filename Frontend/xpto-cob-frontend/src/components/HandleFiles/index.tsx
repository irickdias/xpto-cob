'use client'

import { useRef, useState } from "react";

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

    return (
        <div className="max-w-md mx-auto mt-10 space-y-4">
            <div
                onClick={handleDivClick}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-primary/80 rounded p-6 text-center text-gray-600 cursor-pointer hover:bg-gray-300 transition-all"
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
                <div className="flex items-center justify-between p-2 bg-gray-100 rounded">
                    <span>{file.name}</span>
                    <button
                        onClick={handleRemoveFile}
                        className="text-red-500 hover:text-red-700 text-sm hover:cursor-pointer"
                    >
                        Remover
                    </button>
                </div>
            )}

            <p>Preview</p>
        </div>
    );
}