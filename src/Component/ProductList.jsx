import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import loadingStore from "../Zustand-state/useLoading";
import { toast } from "react-toastify";
import { BaseUrl } from "../Pages/Helper/config";
import { getToken } from "../Pages/Helper/SessionHelper";

export default function ProductList() {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [refresh, setRefresh] = useState(false); // ✅ trigger for re-fetch
  const { setGlobalLoader } = loadingStore();

  // ✨ Edit modal state
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    name: "",
    barcode: "",
  });

  // ✅ Fetch Products
  useEffect(() => {
    const fetchData = async () => {
      setGlobalLoader(true);
      try {
        const { data } = await axios.get(
          `${BaseUrl}/GetProducts/${page}/${limit}/${search || 0}`,
          { headers: { token: getToken() } }
        );

        if (data?.status === "Success") {
          setProduct(data?.data);
          setTotal(data?.data?.pagination?.total);
        } else {
          console.log(data?.msg);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setGlobalLoader(false);
      }
    };
    fetchData();
  }, [page, search, limit, refresh]); // ✅ auto refresh after edit

  // 🧩 Handle Edit Click
  const handleEditClick = (item) => {
    setEditData({
      _id: item._id,
      name: item.name,
      barcode: item.barcode,
    });
    setShowEdit(true);
  };

  // 💾 Handle Save
  const handleSave = async (e) => {
    e.preventDefault();
    setGlobalLoader(true);

    try {
      const { data } = await axios.put(
        `${BaseUrl}/UpdateProduct/${editData._id}`,
        {
          name: editData.name,
          barcode: editData.barcode,
        },
        { headers: { token: getToken() } }
      );

      if (data?.status === "Success") {
        toast.success(data?.msg);
        setShowEdit(false);
        setRefresh((prev) => !prev); // ✅ trigger re-fetch via useEffect
      } else {
        toast.error(data?.msg);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong!");
    } finally {
      setGlobalLoader(false);
    }
  };

  console.log(editData);
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Showing {product?.products?.length} of {total} Sales
          </p>
        </div>

        <div className="flex flex-col lg:flex-row my-2 gap-3">
          <input
            type="text"
            placeholder="Search by Reference or Dealer"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="bg-gray-100 dark:bg-gray-700 py-1 px-2 w-full lg:min-w-xs outline-0 rounded-sm border border-gray-200 text-[14px] font-medium focus:border-gray-400 dark:border-gray-400 dark:focus:border-gray-200"
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

      {/* ======= Table ======= */}
      <div className="w-full overflow-auto">
        <table className="global_table">
          <thead className="global_thead">
            <tr className="global_tr">
              <th className="global_th">No</th>
              <th className="global_th">Product Name</th>
              <th className="global_th">BarCode</th>
              <th className="global_th">Stock</th>
              <th className="global_th">Actions</th>
            </tr>
          </thead>
          <tbody className="global_tbody">
            {product?.products?.map((item, index) => (
              <tr key={index} className="global_tr">
                <td className="global_td">{index + 1}</td>
                <td className="global_td">{item.name}</td>
                <td className="global_td">{item.barcode}</td>
                <td className="global_td">{item.stock ?? "N/A"}</td>
                <td className="global_td">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="icon-btn"
                  >
                    <CiEdit size={20} /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ======= Pagination ======= */}
      {total > 0 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-r-md rounded-l-full ${
              page === 1
                ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "global-btn"
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
                : "global-btn"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* ======= Edit Modal ======= */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-6 w-[400px] shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="global-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Barcode
                </label>
                <input
                  type="text"
                  value={editData.barcode}
                  onChange={(e) =>
                    setEditData({ ...editData, barcode: e.target.value })
                  }
                  className="global-input w-full"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowEdit(false)}
                  className="global-cancel-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="global-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
