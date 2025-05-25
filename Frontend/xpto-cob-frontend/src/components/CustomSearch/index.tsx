import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";

interface CustomSearchProps {
    search: string;
    setSearch: any;
    setUpdateData: any;
    setPage: any;
}

export default function CustomSearch({ search, setSearch, setUpdateData, setPage }: CustomSearchProps) {
    return (
        <div className="w-full flex relative border-1 border-blue-300 bg-gray-100 dark:bg-gray-700 rounded-sm p-1 transition-all">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full focus:outline-none"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && search != "") {
                        e.preventDefault();
                        setUpdateData(Math.random());
                        setPage(1);
                    }
                }}
            />
            {search != "" && <button onClick={() => { setSearch(""), setUpdateData(Math.random()) }} className="border-r-1 hover:cursor-pointer [&>*]:hover:stroke-blue-400 transition-all"><IoCloseOutline className="w-5 h-5" /></button>}
            <button
                onClick={() => {setUpdateData(Math.random()), setPage(1)}}
                disabled={search == ""}
                className={`pl-1 hover:cursor-pointer [&>*]:hover:stroke-blue-400 transition-all disabled:cursor-default`}>
                <IoSearchOutline className="w-4 h-4" />
            </button>
        </div>
    );
}