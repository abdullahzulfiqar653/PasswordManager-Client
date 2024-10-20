import React, { useEffect, useState } from "react";
import moment from "moment";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const PasswordTable = ({ data, handleRowClick }) => {
  const navigate = useNavigate();
  const { selectPasswordsId, toggleSelection, setSelectedPasswordsId } =
    useAuth();
  const [areAllSelected, setAreAllSelected] = useState(false);

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setAreAllSelected(checked);

    if (checked) {
      const allIds = data?.results.map((item) => item.id);
      setSelectedPasswordsId(allIds);
    } else {
      setSelectedPasswordsId([]);
    }
  };

  const handleCheckboxChange = (id) => {
    toggleSelection(id);
  };

  useEffect(() => {
    const allIds = data?.results.map((item) => item.id) || [];

    if (selectPasswordsId.length === allIds.length && allIds.length > 0) {
      setAreAllSelected(true);
    } else {
      setAreAllSelected(false);
    }
  }, [selectPasswordsId, data?.results]);

  return (
    <table className="w-full table-fixed text-center">
      <thead className="text-xs text-gray-700 uppercase z-[3] bg-[#010E59]">
        <tr>
          <th scope="col" className="p-0 w-[50px] h-[60px]">
            <div className="flex items-center justify-center h-full">
              <input
                id="checkbox-all-search"
                type="checkbox"
                className="w-[18px] h-[18px] cursor-pointer bg-[#101E71] border-[#FFFFFF] rounded"
                checked={areAllSelected}
                onChange={handleSelectAllChange}
              />
              <label htmlFor="checkbox-all-search" className="sr-only">
                checkbox
              </label>
            </div>
          </th>
          <th
            scope="col"
            className="border-[1.5px] overflow-hidden w-[140px] h-[60px] border-[#002256] dm-sans text-[15px] font-[400] px-6 py-0 text-[#DFDFDF]"
          >
            Title
          </th>
          <th
            scope="col"
            className="border-[1.5px] overflow-hidden w-[140px] h-[60px] border-[#002256] dm-sans text-[15px] font-[400] px-6 py-0 text-[#DFDFDF]"
          >
            Username
          </th>
          <th
            scope="col"
            className="border-[1.5px] overflow-hidden w-[140px] h-[60px] border-[#002256] dm-sans text-[15px] font-[400] px-6 py-0 text-[#DFDFDF]"
          >
            URL
          </th>
          <th
            scope="col"
            className="border-[1.5px] overflow-hidden w-[160px] h-[60px] border-[#002256] dm-sans text-[15px] font-[400] px-6 py-0 text-[#DFDFDF]"
          >
            Notes
          </th>
          <th
            scope="col"
            className="border-[1.5px] overflow-hidden w-[230px] h-[60px] border-[#002256] dm-sans text-[15px] font-[400] px-0 py-0 text-[#DFDFDF]"
          >
            Modified
          </th>
        </tr>
      </thead>

      {data?.count === 0 && (
        <tbody className="relative w-full h-[565px]">
          <tr>
            <td className="w-full h-full">
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                <img
                  onClick={() => navigate("/dashboard/add")}
                  src="\securityLogo.png"
                  className="mb-1 cursor-pointer"
                  alt="Secure Logo"
                />
                <h1 className="text-[16px] leading-[64px] text-white">
                  Secure Your First Password with Us
                </h1>
                <p className="text-[10px] font-sans leading-[13.02px] text-[#FFFFFFA1]">
                  Take the first step towards safeguarding your digital world.
                  Add your first password now and
                  <br /> experience top-notch security, ease of access, and
                  peace of mind. Start building your vault and
                  <br /> protect what matters most.
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      )}

      <tbody>
        {data?.results.map((item, index) => (
          <tr
            key={index}
            className="bg-transparent border-[1.5px] border-[#002256] hover:bg-[#4207AF]"
          >
            <td className="w-4 p-4" style={{ height: "70px" }}>
              <div className="flex items-center">
                <input
                  id={`checkbox-table-search-${index}`}
                  type="checkbox"
                  className="w-[18px] h-[18px] bg-[#101E71] cursor-pointer border-[#FFFFFF] rounded"
                  onChange={(e) => {
                    e.stopPropagation();
                    handleCheckboxChange(item.id);
                  }}
                  checked={selectPasswordsId.includes(item.id)}
                />
                <label
                  htmlFor={`checkbox-table-search-${index}`}
                  className="sr-only"
                >
                  checkbox
                </label>
              </div>
            </td>
            <th
              onClick={() => handleRowClick(item)}
              scope="row"
              className="border-[1.5px] relative border-[#002256] overflow-hidden dm-sans text-[15px] font-[400] pl-10 px-6 py-0 text-[#DFDFDF] whitespace-nowrap"
              style={{ height: "70px" }}
            >
              {item?.emoji && (
                <img
                  src={`/${item.emoji}.png`}
                  alt={item.emoji}
                  className="h-6 w-6 absolute left-[10px]"
                />
              )}
              {item.title}
            </th>
            <td
              onClick={() => handleRowClick(item)}
              className="border-[1.5px] border-[#002256] overflow-hidden dm-sans text-[15px] font-[400] px-6 py-0 text-[#DFDFDF]"
              style={{ height: "70px" }}
            >
              {item.username}
            </td>
            <td
              onClick={() => handleRowClick(item)}
              className="border-[1.5px] border-[#002256] overflow-hidden dm-sans text-[15px] font-[400] px-6 py-0 text-[#DFDFDF]"
              style={{ height: "70px" }}
            >
              {item.url}
            </td>
            <td
              onClick={() => handleRowClick(item)}
              className="border-[1.5px] border-[#002256] overflow-hidden dm-sans text-[15px] font-[400] px-6 py-0 text-[#DFDFDF]"
              style={{ height: "70px" }}
            >
              {item.notes}
            </td>
            <td
              onClick={() => handleRowClick(item)}
              className="border-[1.5px] border-[#002256] overflow-hidden dm-sans text-[15px] font-[400] px-3 py-0 text-[#DFDFDF]"
              style={{ height: "70px" }}
            >
              {moment(item.updated_at).format("MMM Do YYYY, h:mm:ss a")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PasswordTable;
