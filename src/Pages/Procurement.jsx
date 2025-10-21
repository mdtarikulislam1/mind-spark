import React from "react";

export default function Procurement() {
  return (
    <div className="max-w-7xl mx-auto p-3">
      <h4 className="global-heading">Procurement</h4>
      <div className="dark:bg-gray-700 border dark:border-gray-700 border-gray-300 mt-4 bg-gray-50 rounded-md p-5">
        <h5 className="font-semibold text-xl pb-3">Create Purchase Order</h5>
        <form action="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div className="flex flex-col gap-1">
              <label className="font-medium">Product</label>

              <select className="global-input no-spinner" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-medium">Moveon Product ID</label>
              <input
                className="global-input no-spinner"
                type="text"
                placeholder="Moveon Product ID"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-medium">Quantity</label>
              <input
                className="global-input no-spinner"
                type="number"
                placeholder="Quantity"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-medium">Total Purchase Price (৳)</label>
              <input
                className="global-input no-spinner"
                type="number"
                placeholder="Total Purchase Price (৳)"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Product</label>

              <select className="global-input no-spinner" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </div>
          </div>
          <input className=" w-full text-center py-2 my-4 hover:bg-blue-800 font-semibold text-white rounded-lg bg-blue-700 dark:bg-gray-800 dark:hover:bg-gray-900" type="submit" value="Place Order" />
        </form>
      </div>
    </div>
  );
}
