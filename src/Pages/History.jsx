import React, { useRef } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { useDownloadStore } from "../Zustand-state/Download-Xlsx";

export default function History() {
  // download
  const { downloadSelected } = useDownloadStore();
  const containerRef = useRef(null);

  return (
    <div className="max-w">
      <div className="w-full overflow-auto" ref={containerRef}>
        <div className="my-4 flex justify-between items-center gap-4">
          <h4 className="global-heading">Sales History</h4>

          <button
            className="bg-blue-700 py-1.5 px-3 rounded-md font-semibold text-white flex justify-center items-center gap-1 cursor-pointer"
            onClick={() => downloadSelected(containerRef, "report")}
          >
            <MdOutlineFileDownload size={20} />
            Export
          </button>
        </div>
        <table className="global_table">
          <thead className="global_thead">
            <tr className="global_tr">
              <th className="global_th">no</th>
              <th className="global_th">Items</th>
              <th className="global_th">Date</th>
              <th className="global_th">Total Revenue</th>
              <th className="global_th">Total COGS</th>
              <th className="global_th">Gross Profit</th>
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
