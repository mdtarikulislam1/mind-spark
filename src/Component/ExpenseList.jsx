import React, { useRef } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { useDownloadStore } from "../Zustand-state/Download-Xlsx";

export default function ExpenseList() {
  // download
  const { downloadSelected } = useDownloadStore();
  const containerRef = useRef(null);

  return (
    <div ref={containerRef}>
      <h4 className="font-semibold text-xl mt-5">Expense List</h4>
      <div className="my-4 flex justify-between items-center gap-4">
        <input
          className="global-input max-w-xl"
          type="search"
          placeholder="Search Your Data"
        />

        <button
          className="icon-btn"
          onClick={() => downloadSelected(containerRef, "report")}
        >
          <MdOutlineFileDownload size={20} />
          Export
        </button>
      </div>
     <div className="w-full overflow-auto">
       <table className="global_table">
        <thead className="global_thead">
          <tr className="global_tr">
            <th className="global_th">no</th>
            <th className="global_th">Date</th>
            <th className="global_th">Category</th>
            <th className="global_th">Source</th>
            <th className="global_th">Amount</th>
            <th className="global_th">Asset Type</th>
            <th className="global_th">Actions</th>
          </tr>
        </thead>
        <tbody className="global_tbody">
          <tr className="global_tr">
            <td className="global_td">1</td>
          </tr>
        </tbody>
      </table>
     </div>
    </div>
  );
}
