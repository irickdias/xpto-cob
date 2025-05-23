'use client'

import HandleFiles from "@/components/HandleFiles";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaFileExport } from "react-icons/fa6";
import { MdOutlineRefresh } from "react-icons/md";
import { toast } from "react-toastify";

export default function Home() {
  const [sendingRequestUpdate, setSendingRequestUpdate] = useState(false);
  const [sendingRequestExport, setSendingRequestExport] = useState(false);

  async function updateDebts() {
    setSendingRequestUpdate(true);
    try {
      const loadingToast = toast.loading("Atualizando...");

      const response = await fetch('https://localhost:7249/xpto/debt/update-debts', {
        method: 'GET'
      });

      console.log("teste response", response)

      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success("Dívidas atualizadas com sucesso!");
      }
      else {
        toast.error("Erro ao atualizar dívidas. Aguarde um momento e tente novamente.");
      }

      // const data = await response.json();
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);
      toast.error("Erro ao atualizar dívidas. Aguarde um momento e tente novamente.");
    }
    setSendingRequestUpdate(false);
  }

  async function exportDebts() {
    setSendingRequestExport(true);
    try {
      const loadingToast = toast.loading("Exportando...");

      const response = await fetch('https://localhost:7249/xpto/debt/update-debts', {
        method: 'GET'
      });

      console.log("teste response", response)

      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success("Exportação realizada com sucesso!");
      }
      else {
        toast.error("Erro ao exportar dívidas. Aguarde um momento e tente novamente.");
      }

      // const data = await response.json();
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);
      toast.error("Erro ao exportar dívidas. Aguarde um momento e tente novamente.");
    }
    setSendingRequestExport(false);
  }


  return (
    <section className="w-full h-[94vh] flex justify-center bg-white dark:bg-gray-900">
      <div className="w-[50%] relative p-4 bg-gray-200 dark:bg-gray-800 ">
        <HandleFiles />

        <div className="flex justify-end gap-2">
          <button 
            onClick={updateDebts} 
            className={`py-1 px-2 flex items-center gap-1 text-gray-900 font-semibold bg-blue-400 rounded-sm w-auto hover:cursor-pointer disabled:cursor-default transition-all ${sendingRequestUpdate || sendingRequestExport ? '' : 'hover:bg-blue-400/80'}`}
            disabled={sendingRequestUpdate || sendingRequestExport}
            >
            { sendingRequestUpdate ? <AiOutlineLoading className="animate-spin w-5 h-5"/>  : <MdOutlineRefresh className="w-5 h-5" /> }
            Atualizar dívidas
          </button>
          <button 
            className={`py-1 px-2 flex items-center gap-1 text-gray-900 font-semibold bg-green-400 rounded-sm w-auto hover:cursor-pointer disabled:cursor-default transition-all ${sendingRequestUpdate || sendingRequestExport ? '' : 'hover:bg-green-400/80'}`}
            disabled={sendingRequestUpdate || sendingRequestExport}
            >
            { sendingRequestExport ? <AiOutlineLoading className="animate-spin w-5 h-5"/> : <FaFileExport className="w-5 h-5" /> }
            Exportar dívidas
          </button>
        </div>
      </div>
    </section>
  );
}
