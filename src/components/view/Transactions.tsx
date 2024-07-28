import React, { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { pageDataType, tableDataType } from "../../types";

type TransactionProps = {
  tableData: tableDataType[];
};

const Transactions: React.FC<TransactionProps> = ({ tableData }) => {
  const limitPerPage = 10;

  const [pageData, setPageData] = useState<pageDataType>({
    currentPage: 1,
    lastPage: 1,
  });
  const [dateFilter, setDateFilter] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });
  const [sortType, setSortType] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");

  const filteredData = tableData?.filter((item) => {
    const start = new Date(dateFilter.startDate);
    const end = new Date(dateFilter.endDate);

    return dateFilter.startDate && dateFilter.endDate
      ? item.type.includes(filterType) &&
          item.date.getTime() >= start.getTime() &&
          item.date.getTime() <= end.getTime()
      : item.type.includes(filterType);
  });

  const sortedData = filteredData?.sort((a, b) =>
    sortType === "asc"
      ? a.date.getTime() - b.date.getTime()
      : sortType === "desc"
      ? b.date.getTime() - a.date.getTime()
      : b.date.getTime() - a.date.getTime()
  );

  const paginatedData = sortedData.slice(
    limitPerPage * (pageData.currentPage - 1),
    limitPerPage * pageData.currentPage
  );

  useEffect(() => {
    setPageData((prev) => {
      return {
        ...prev,
        currentPage:
          Math.ceil(sortedData.length / limitPerPage) < prev.lastPage
            ? 1
            : prev.currentPage,
        lastPage: Math.ceil(sortedData.length / limitPerPage),
      };
    });
  }, [sortedData?.length]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-base font-bold  text-[26px]">Transactions</h4>

        {tableData.length > 0 && (
          <div className="flex items-center space-x-2.5">
            <div className="flex items-center space-x-2">
              <label htmlFor="start" className="text-base font-medium">
                Start date:
              </label>
              <input
                type="date"
                id="start"
                name="startDate"
                className="border rounded-md px-2 py-1"
                onChange={(evt) => {
                  setDateFilter((prev) => ({
                    ...prev,
                    startDate: evt.target.value,
                  }));
                }}
                value={dateFilter.startDate}
              />
            </div>

            {dateFilter.startDate && (
              <div className="flex items-center space-x-2">
                <label htmlFor="end" className="text-base font-medium">
                  End date:
                </label>
                <input
                  type="date"
                  id="end"
                  name="endDate"
                  className="border rounded-md px-2 py-1"
                  onChange={(evt) => {
                    setDateFilter((prev) => ({
                      ...prev,
                      endDate: evt.target.value,
                    }));
                  }}
                  value={dateFilter.endDate}
                  min={dateFilter.startDate}
                  // max="2018-12-31"
                />
              </div>
            )}

            <select
              name="filter"
              id="filter"
              className="py-2 pr-4 pl-2 text-sm custom font-medium rounded-md border w-[130px] border-gray-300 outline-none"
              onChange={(evt) => setFilterType(evt.target.value)}
            >
              <option value={""}>Filter by</option>
              <option value={"deposit"}>Deposits</option>
              <option value={"withdraw"}>Withdrawal</option>
            </select>

            <select
              name="sort"
              id="sort"
              className="py-2 pr-4 pl-2 text-sm custom font-medium rounded-md border w-[130px] border-gray-300 outline-none"
              onChange={(evt) => setSortType(evt.target.value)}
            >
              <option value={""}>Sort by</option>
              <option value={"asc"}>Ascending</option>
              <option value={"desc"}>Descending</option>
            </select>
          </div>
        )}
      </div>

      <div>
        <div className="grid grid-cols-5 px-4 py-2 bg-gray-100 font-semibold">
          <span>S/N</span>
          <span>Date</span>
          <span>Amount ($)</span>
          <span>Balance ($)</span>
          <span>Transaction Type</span>
        </div>

        {tableData.length > 0 ? (
          <div>
            {paginatedData?.map((history, idx) => {
              const date = new Date(`${history.date}`);
              const day = date.getDate();
              const month = date.getMonth() + 1;
              const year = date.getFullYear();

              return (
                <div
                  key={idx}
                  className="grid grid-cols-5 px-4 font-medium py-3 border-b text-sm"
                >
                  <span>{idx + 1}</span>
                  <span>{`${day}.${month}.${year}`}</span>
                  <span>
                    {history.type !== "deposit" && "-"}
                    {history.amount.toLocaleString()}
                  </span>
                  <span>{history.balance.toLocaleString()}</span>
                  <span
                    className={`px-3 py-2 w-fit rounded-lg text-xs font-semibold capitalize  ${
                      history.type === "withdraw"
                        ? "bg-red-300/20"
                        : history.type === "transfer"
                        ? "bg-orange-300/20"
                        : "bg-green-300/20"
                    } ${
                      history.type === "withdraw"
                        ? "text-red-700"
                        : history.type === "transfer"
                        ? "text-orange-700"
                        : "text-green-700"
                    }`}
                  >
                    {history.type === "withdraw" ? "withdrawal" : history.type}
                  </span>
                </div>
              );
            })}

            <div className="flex justify-end mt-6">
              <ResponsivePagination
                current={pageData?.currentPage}
                total={pageData.lastPage}
                onPageChange={(page) => {
                  console.log("pageeee", page);
                  setPageData((prev) => {
                    return {
                      ...prev,
                      currentPage: page,
                    };
                  });
                  // setSliceData({
                  //   start: limitPerPage * (page - 1),
                  //   end: limitPerPage * page,
                  // });
                }}
                maxWidth={200}
              />
            </div>
          </div>
        ) : (
          <span className="block text-center text-lg font-medium py-8">
            You have no transaction history at this time
          </span>
        )}
      </div>
    </div>
  );
};

export default Transactions;