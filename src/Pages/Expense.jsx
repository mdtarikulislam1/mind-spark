import React from "react";
import ExpenseList from "../Component/ExpenseList";

export default function Expense() {
  return (
    <div className="max-w">
      <h4 className="global-heading">Expenses</h4>
      <div className="dark:bg-gray-700 border dark:border-gray-700 border-gray-300 mt-4 bg-gray-50 rounded-md p-5">
        <h5 className="font-semibold text-xl pb-3">Add Expense</h5>
        <form action="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div className="flex flex-col gap-1">
              <label className="font-medium">Date</label>
              <input
                className="global-input"
                type="date"
                placeholder="Moveon Product ID"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-medium">Main Category</label>

              <select className="global-input" id="mainCat">
                <option value="" disabled>
                  Select a category
                </option>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-medium">Sub-category</label>

              <select className="global-input" id="subCat">
                <option value="" disabled>
                  Select a sub category
                </option>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-medium">Amount (৳)</label>
              <input
                className="global-input no-spinner"
                type="number"
                placeholder="Amount"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-medium">Source</label>
              <input
                className="global-input no-spinner"
                type="number"
                placeholder="Source"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Asset Type</label>

              <select className="global-input no-spinner" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </div>
          </div>
          <input
            className=" w-full text-center py-2 my-4 hover:bg-blue-800 font-semibold text-white rounded-lg bg-blue-700 dark:bg-gray-800 dark:hover:bg-gray-900"
            type="submit"
            value="Place Order"
          />
        </form>
      </div>
<ExpenseList/>
     
    </div>
  );
}
