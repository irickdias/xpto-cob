import React from "react";
import { MdArrowForwardIos } from "react-icons/md";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: any;
};

export default function PaginationNavigator({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-1 border-1 border-blue-300 bg-gray-100 dark:bg-gray-700 rounded-sm hover:bg-gray-200/80 hover:dark:bg-gray-700/80 hover:cursor-pointer disabled:cursor-default"
      >
        <MdArrowForwardIos className="w-4 h-4 rotate-180" />
      </button>

      <p className="text-sm font-semibold p-0.5">{currentPage}</p>

      <button
        disabled={totalPages == 0 || currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-1 border-1 border-blue-300 bg-gray-100 dark:bg-gray-700 rounded-sm hover:bg-gray-200/80 hover:dark:bg-gray-700/80 hover:cursor-pointer disabled:cursor-default"
      >
        <MdArrowForwardIos className="w-4 h-4" />
      </button>
    </div>
  );
};