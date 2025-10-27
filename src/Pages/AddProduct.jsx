import React from "react";
import ProductList from "../Component/ProductList";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import useModal from "../Zustand-state/useModal";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "./Helper/SessionHelper";
import { BaseUrl } from "./Helper/config";

export default function AddProduct() {
  const { modalOpen, toggleModal } = useModal(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, barcode } = e.target;

    const finalData = {
      name: name.value.trim(),
      barcode: barcode.value.trim(),
    };

    console.log(finalData);
    try {
      const { data } = await axios.post(`${BaseUrl}/CreateProduct`, finalData, {
        headers: { token: getToken() },
      });

      console.log(data);

      if (data?.status === "Success") {
        toast.success(data?.msg || "Product Create Successfully");
      } 
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.msg || "Something went wrong");
      } else {
        toast.error(error.message || "Network Error");
      }
    }
  };

  return (
    <div className="max-w">
      <div className="flex justify-between items-center my-4 gap-2">
        <h4 className="global-heading">Products</h4>

        <button
          onClick={toggleModal}
          className="icon-btn flex items-center gap-1"
        >
          <IoIosAddCircleOutline size={20} />
          Add Product
        </button>
      </div>

      <ProductList />

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-300 dark:border-gray-500 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-red-700 cursor-pointer"
            >
              <MdOutlineCancel size={22} />
            </button>

            <h3 className="text-lg font-semibold mb-4">Add New Product</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="col-dir">
                <label>Product Name</label>
                <input
                  required
                  className="global-input"
                  name="name"
                  type="text"
                  placeholder="Enter Product Name"
                />
              </div>

              <div className="col-dir">
                <label>Bar Code</label>
                <input
                  className="global-input no-spinner"
                  name="barcode"
                  type="number"
                  placeholder="Enter Bar Code"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={toggleModal}
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
    </div>
  );
}
