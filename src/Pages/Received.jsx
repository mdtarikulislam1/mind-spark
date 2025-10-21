// import React, { useRef } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
// import { useDownloadStore } from "../Zustand-state/Download-Xlsx";

export default function Received() {
  // download
  // const { downloadSelected } = useDownloadStore();
  // const containerRef = useRef(null);

  return (
    <div className="max-w">
      <div className="my-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h4 className="global-heading">Received Stock</h4>

        <input
          className="global-input max-w-xl"
          type="search"
          placeholder="Search Your Data"
        />
      </div>
      <div className="w-full overflow-auto">
        <table className="global_table">
          <thead className="global_thead">
            <tr className="global_tr">
              <th className="global_th">no</th>
              <th className="global_th">Product</th>
              <th className="global_th">Moveon ID</th>
              <th className="global_th">Qty</th>
              <th className="global_th">Purchase Price</th>
              <th className="global_th">Shipping</th>
              <th className="global_th">Total Cost</th>
              <th className="global_th">COGS/Unit</th>
              <th className="global_th">Received Date</th>
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
