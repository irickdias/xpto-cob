'use client'

import CustomSearch from "@/components/CustomSearch";
import CustomSelect from "@/components/CustomSelect";
import DebtsTable from "@/components/DebtsTable";
import HandleFiles from "@/components/HandleFiles";
import PaginationNavigator from "@/components/PaginationNavigator";
import { api } from "@/utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaFileExport } from "react-icons/fa6";
import { MdOutlineRefresh } from "react-icons/md";
import { toast } from "react-toastify";

export default function Home() {
  const [updatingData, setUpdatingData] = useState(false);
  const [sendingRequestUpdate, setSendingRequestUpdate] = useState(false);
  const [sendingRequestExport, setSendingRequestExport] = useState(false);
  const [debts, setDebts] = useState<DebtsResponse | any>("");
  const [updateData, setUpdateData] = useState(0);
  const [filterBy, setFilterBy] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const filters = [
    {
      id: 1,
      name: "Nome"
    },
    {
      id: 2,
      name: "CPF"
    },
    {
      id: 3,
      name: "Contrato"
    }
    
  ]

  useEffect(() => {
    getDebts();
  }, [updateData]);


  async function getDebts() {
    setUpdatingData(true);
    try {

      const response : any = await fetch(`${api}xpto/debt?customer=${filterBy == 1 ? search : ''}&contract=${filterBy == 3 ? search : ''}&cpf=${filterBy == 2 ? search : ''}`, {
        method: 'GET'
      });
      const json = await response.json();

      //console.log("teste response", json)

      if (response.ok) {
        setDebts(json);
        //console.log(debts);
      }
      else {
        toast.error("Erro ao carregar as dívidas.");
      }

      // const data = await response.json();
    } catch (error) {
      console.error('Erro ao carregar as dívidas.', error);
      toast.error("Erro ao carregar as dívidas.");
    }
    setUpdatingData(false);
  }

  async function updateDebts() {
    setSendingRequestUpdate(true);
    try {
      const loadingToast = toast.loading("Atualizando...");

      const response = await fetch(`${api}xpto/debt/update-debts`, {
        method: 'GET'
      });

      console.log("teste response", response)

      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success("Dívidas atualizadas com sucesso!");
        setUpdateData(Math.random());
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

      const response = await fetch(`${api}xpto/debt/export`, {
        method: 'GET'
      });

      console.log("teste response", response)

      toast.dismiss(loadingToast);

      if (response.ok) {
        // baixa arquivo
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");

        // cria uma tag a invisivel e depois libera
        a.href = url;

        const today = new Date();
        const tDay = today.getDate().toString().padStart(2, '0');
        const tMonth = (today.getMonth() + 1).toString().padStart(2, '0');
        const tYear = today.getFullYear();
        a.download = `Divida-Atualizada-${tDay}-${tMonth}-${tYear}.csv`;

        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

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
    <section className="w-full h-[94vh] flex justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-[65%] overflow-auto relative p-4 space-y-4 bg-white dark:bg-gray-800 ">
        <HandleFiles setUpdateData={setUpdateData}/>

        <div className="flex justify-end gap-2">
          <button
            onClick={updateDebts}
            className={`py-1 px-2 flex items-center gap-1 text-gray-900 font-semibold bg-blue-400 rounded-sm w-auto hover:cursor-pointer disabled:cursor-default transition-all ${sendingRequestUpdate || sendingRequestExport ? '' : 'hover:bg-blue-400/80'}`}
            disabled={sendingRequestUpdate || sendingRequestExport}
          >
            {sendingRequestUpdate ? <AiOutlineLoading className="animate-spin w-5 h-5" /> : <MdOutlineRefresh className="w-5 h-5" />}
            Atualizar dívidas
          </button>
          <button
            onClick={exportDebts}
            className={`py-1 px-2 flex items-center gap-1 text-gray-900 font-semibold bg-green-400 rounded-sm w-auto hover:cursor-pointer disabled:cursor-default transition-all ${sendingRequestUpdate || sendingRequestExport ? '' : 'hover:bg-green-400/80'}`}
            disabled={sendingRequestUpdate || sendingRequestExport}
          >
            {sendingRequestExport ? <AiOutlineLoading className="animate-spin w-5 h-5" /> : <FaFileExport className="w-5 h-5" />}
            Exportar dívidas
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CustomSearch search={search} setSearch={setSearch} setUpdateData={setUpdateData}/>
            {/* <p>Filtrar por:</p> */}
            <CustomSelect options={filters} value={filterBy} onChange={(e: any) => {setFilterBy(e), setSearch("")}} required={false}/>
          </div>
          <PaginationNavigator totalPages={debts.totalPages} currentPage={page} onPageChange={setPage}/>
        </div>

        <DebtsTable debts={debts.data}/>
      </div>
    </section>
  );
}
