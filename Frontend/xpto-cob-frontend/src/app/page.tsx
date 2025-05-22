
import HandleFiles from "@/components/HandleFiles";
import Image from "next/image";
import { FaFileExport } from "react-icons/fa6";
import { MdOutlineRefresh } from "react-icons/md";

export default function Home() {
  return (
    <section className="w-full h-[94vh] flex justify-center bg-white dark:bg-gray-900">
      <div className="w-[50%] relative p-4 bg-gray-200 dark:bg-gray-800 ">
        <HandleFiles />

        <div className="flex justify-end gap-2">
          <button className="py-1 px-2 flex items-center gap-1 text-gray-900 font-semibold bg-blue-400 hover:bg-blue-400/80 rounded-sm w-auto hover:cursor-pointer transition-all [&>*]:stroke-white hover:[&>*]:stroke-green-700">
            <MdOutlineRefresh className="w-5 h-5"/>
            Atualizar dívidas
          </button>
          <button className="py-1 px-2 flex items-center gap-1 text-gray-900 font-semibold bg-green-400 hover:bg-green-400/80 rounded-sm w-auto hover:cursor-pointer transition-all [&>*]:stroke-white hover:[&>*]:stroke-green-700">
            <FaFileExport  className="w-5 h-5"/>
            Exportar dívidas
          </button>
        </div>
      </div>
    </section>
  );
}
