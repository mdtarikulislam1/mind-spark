export default function Orders() {
  return (
    <div className="max-w">
      <div>
        <div className="my-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h4 className="global-heading text-nowrap">Pending Orders</h4>

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
              <th className="global_th">Moveon ID </th>
              <th className="global_th">Qty</th>
              <th className="global_th">Purchase Price</th>
              <th className="global_th">Order Date</th>
              <th className="global_th">Days Passed</th>
              <th className="global_th">Status</th>
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
    </div>
  );
}
