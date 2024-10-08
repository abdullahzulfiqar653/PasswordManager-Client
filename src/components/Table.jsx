import React from "react";
import moment from "moment";
import { useAuth } from "../AuthContext";

const PasswordTable = ({ data, handleRowClick }) => {
  const { search } = useAuth();
  return (
    <table className="w-full text-sm text-left">
      <thead className="text-xs text-gray-700 uppercase z-[3] bg-[#010E59]">
        <tr>
          <th scope="col" className="p-4">
            <div className="flex items-center">
              <input
                id="checkbox-all-search"
                type="checkbox"
                className="w-[18px] h-[18px]  bg-[#101E71] border-[#FFFFFF] rounded"
              />
              <label htmlFor="checkbox-all-search" className="sr-only">
                checkbox
              </label>
            </div>
          </th>
          <th
            scope="col"
            className="border-[1.5px] border-[#002256] dm-sans text-[15px] font-[400] px-6 py-[20px] text-[#DFDFDF]"
          >
            Title
          </th>
          <th
            scope="col"
            className="border-[1.5px] border-[#002256] dm-sans text-[15px] font-[400]  px-6 py-[20px] text-[#DFDFDF]"
          >
            Username
          </th>
          <th
            scope="col"
            className="border-[1.5px] border-[#002256] dm-sans text-[15px] font-[400]  px-6 py-[20px] text-[#DFDFDF]"
          >
            URL
          </th>
          <th
            scope="col"
            className="border-[1.5px] border-[#002256] dm-sans text-[15px] font-[400]  px-6 py-[20px] text-[#DFDFDF]"
          >
            Notes
          </th>
          <th
            scope="col"
            className="border-[1.5px] border-[#002256] dm-sans text-[15px] font-[400]  px-6 py-[20px] text-[#DFDFDF]"
          >
            Modefied
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.results
          .filter((item) =>item?.title.toLowerCase().includes(search.toLowerCase()))
          .map((item, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(item)}
              className="bg-transparent border-[1.5px] border-[#002256] hover:bg-[#4207AF]"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-[18px] h-[18px]  bg-[#101E71] border-[#FFFFFF] rounded"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="border-[1.5px] border-[#002256] dm-sans text-[15px] font-[400]  px-6 py-[20px] text-[#DFDFDF] whitespace-nowrap"
              >
                {item?.emoji
                  ? String.fromCodePoint(parseInt(item.emoji, 16))
                  : ""}{" "}
                {item.title}
              </th>
              <td className="border-[1.5px] border-[#002256] dm-sans text-[15px] font-[400]  px-6 py-[20px] text-[#DFDFDF]">
                {item.username}
              </td>
              <td className="border-[1.5px] border-[#002256] dm-sans text-[15px] font-[400]  px-6 py-[20px] text-[#DFDFDF]">
                {item.url}
              </td>
              <td className="border-[1.5px] border-[#002256] dm-sans text-[15px] font-[400]  px-6 py-[20px] text-[#DFDFDF]">
                {item.notes}
              </td>
              <td className="border-[1.5px] border-[#002256] dm-sans text-[15px] font-[400]  px-6 py-[20px] text-[#DFDFDF]">
                {moment(item.updated_at).format("MMM Do YYYY, h:mm:ss a")}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default PasswordTable;
