import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Pages/Helper/config";
import { getToken } from "../Pages/Helper/SessionHelper";
import { CiEdit } from "react-icons/ci";
import loadingStore from "../Zustand-state/useLoading";

export default function ProductList() {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const { setGlobalLoader } = loadingStore();

  useEffect(() => {
    const fetchData = async () => {
      setGlobalLoader(true);
      try {
        const { data } = await axios.get(
          `${BaseUrl}/GetProducts/${page}/${limit}/${search || 0}`,
          {
            headers: { token: getToken() },
          }
        );

        if (data?.status === "Success") {
          setProduct(data?.data);
          setTotal(data?.data?.pagination?.total);
        } else {
          console.log(data?.msg);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setGlobalLoader(false);
      }
    };
    fetchData();
  }, [page,search, limit]);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Showing of {total} Sales
          </p>
        </div>

        <div className="flex flex-col lg:flex-row my-2 gap-3">
          <input
            type="text"
            placeholder="Search by Reference or Dealer"
            value={search}
            onChange={(e) => {
              console.log(e.target.value)
              setSearch(e.target.value);
              setPage(1); // Reset to first page on search
            }}
            className="global-input"
          />
          <select
            value={limit}
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
              setPage(1);
            }}
            className="global-input"
          >
            {[10, 20, 50, 100].map((opt) => (
              <option key={opt} value={opt}>
                {opt} per page
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full overflow-auto">
        <table className="global_table">
          <thead className="global_thead">
            <tr className="global_tr">
              <th className="global_th">no</th>
              <th className="global_th">Product Name</th>
              <th className="global_th">BarCode</th>
              <th className="global_th">stock</th>
              <th className="global_th">Actions</th>
            </tr>
          </thead>
          <tbody className="global_tbody">
            {product?.products?.map((item, index) => (
              <tr key={index} className="global_tr">
                <td className="global_td">{index + 1}</td>
                <td className="global_td">{item.name}</td>
                <td className="global_td">{item.barcode}</td>
                <td className="global_td">
                  {item.stock ? item?.stock : "N/A"}
                </td>
                <td className="global_td">
                  <button className="icon-btn">
                    <CiEdit size={20} />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {total > 0 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-r-md rounded-l-full ${
              page === 1
                ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "global_button"
            }`}
          >
            Previous
          </button>

          <span className="text-sm text-gray-700 dark:text-gray-300">
            Page {page} of {Math.ceil(total / limit)}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= Math.ceil(total / limit)}
            className={`px-4 py-2 rounded-l-md rounded-r-full ${
              page >= Math.ceil(total / limit)
                ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "global_button"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
