import React from "react";

export default function Procurement() {
  return (
    <div className="max-w-7xl mx-auto p-3 ">
      <h4 className="font-semibold text-2xl ">Procurement</h4>
      <div className="dark:bg-gray-700 border dark:border-gray-700 border-gray-300 mt-4 bg-gray-50 rounded-md p-5">
        <h5 className="font-semibold text-lg pb-3">Create Purchase Order</h5>
         <form action="">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Product</label>
          <input className="bg-gray-100 dark:bg-gray-600 py-1 px-2 w-full outline-0 rounded-sm border focus:border-gray-400 border-gray-200" type="text" />
          </div>
         </form>
      </div>
    </div>
  );
}
