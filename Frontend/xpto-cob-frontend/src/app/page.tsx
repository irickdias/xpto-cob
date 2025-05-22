import HandleFiles from "@/components/HandleFiles";
import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full h-[94vh] flex justify-center bg-white dark:bg-gray-900">
      <div className="w-[50%] relative bg-gray-200 dark:bg-gray-800 ">
        <HandleFiles/>
      </div>
    </section>
  );
}
