import { Link } from "react-router-dom";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import PasswordTable from "../../components/Table";
import RootFolder from "../../components/RootFolder";
import SearchesTags from "../../components/SearchesTags";
import PasswordDetailContent from "../../components/PasswordDetail";
import { UpArrow, DownArrow } from "../../assets/icons";
import useGetUserPasswords from "../../hooks/useGetUserPasswords";
import { decryptAnyData } from "../../utils/cryptoOperations";

const PasswordFolder = ({searchTerm}) => {
  const navigate = useNavigate();
  const { isDesktop, passSelectedFolderId, setSearch, folderTitle } =
    useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [passwordsList, setPasswordList] = useState([]);

  // Use React Query with debounced search term
  const { data, isLoading } = useGetUserPasswords(
    passSelectedFolderId,
    searchTerm
  );

  // Memoized decryption function for single password
  const decryptPasswordData = useCallback(async (passwordData) => {
    if (!passwordData) return passwordData;

    try {
      const decryptedData = { ...passwordData };
      const encryptedFields = ["username", "password", "url", "notes", "emoji"];

      const decryptionPromises = encryptedFields.map(async (field) => {
        const encryptedValue = passwordData[field];
        if (encryptedValue && typeof encryptedValue === "string") {
          try {
            return await decryptAnyData(encryptedValue);
          } catch (error) {
            console.error(`Failed to decrypt ${field}:`, error);
            return encryptedValue;
          }
        }
        return passwordData[field];
      });

      const decryptedValues = await Promise.all(decryptionPromises);
      encryptedFields.forEach((field, index) => {
        decryptedData[field] = decryptedValues[index];
      });

      return decryptedData;
    } catch (error) {
      console.error("Password data decryption error:", error);
      return passwordData;
    }
  }, []);

  // Decrypt entire list of passwords
  const decryptPasswordsList = useCallback(
    async (dataList) => {
      if (!dataList || !Array.isArray(dataList)) {
        setPasswordList([]);
        return;
      }

      try {
        const decryptionPromises = dataList.map((password) =>
          decryptPasswordData(password)
        );
        const decryptedPasswords = await Promise.all(decryptionPromises);
        setPasswordList(decryptedPasswords);
      } catch (error) {
        console.error("Passwords list decryption error:", error);
        setPasswordList(dataList);
      }
    },
    [decryptPasswordData]
  );


  // Decrypt passwords when data changes
  useEffect(() => {
    if (data?.results) {
      decryptPasswordsList(data.results);
    } else {
      setPasswordList([]);
    }
  }, [data?.results, decryptPasswordsList]);

  // Handle tab click
  const handleTabClick = useCallback((index) => {
    setActiveTab(index);
  }, []);

  // Handle row click
  const handleRowClick = useCallback(
    (item) => {
      navigate(`/dashboard/edit/${item.id}`, { state: { item } });
      setSearch("");
    },
    [navigate, setSearch]
  );

  // Memoized desktop view
  const desktopView = useMemo(
    () => (
      <section className="w-full rounded-[12px] flex flex-col gap-[11px]">
        <section className="bg-[#101E71] rounded-[12px] min-h-[624px]">
          <div className="relative h-[624px] overflow-auto sm:rounded-lg">
            <PasswordTable
              count={data?.count}
              data={passwordsList}
              handleRowClick={handleRowClick}
              isLoading={isLoading}
            />
          </div>
        </section>
        <RootFolder />
        <div className="block lg:hidden">
          <SearchesTags />
        </div>
      </section>
    ),
    [data?.count, passwordsList, handleRowClick, isLoading]
  );

  // Memoized mobile view
  const mobileView = useMemo(
    () => (
      <section className="flex flex-col gap-[0px] mt-[13px]">
        <h3 className="cursor-pointer dm-sans font-[400] text-[12px] leading-[64px] text-white">
          <Link
            to="/dashboard/folders"
            className="text-[#5D73F2]"
          >{`Folders > ${folderTitle} > `}</Link>
          Passwords
        </h3>
        <div className="flex flex-col gap-[11px]">
          {passwordsList?.map((passWordRecord, index) => (
            <div
              key={`${passWordRecord.id || index}-${activeTab}`}
              className="flex flex-col gap-[2px] rounded-[6px] bg-[#0E1A60]"
            >
              <button
                onClick={() => handleTabClick(index)}
                className={`${
                  index === activeTab ? "active" : ""
                } flex justify-between items-center relative text-white bg-[#010E59] py-[17px] px-[44px] text-[14px] dm-sans font-[400] leading-[20px]`}
                aria-expanded={index === activeTab}
                aria-controls={`password-details-${index}`}
              >
                {passWordRecord?.emoji && (
                  <img
                    src={`/${passWordRecord.emoji}.png`}
                    alt={passWordRecord.emoji}
                    className="h-6 absolute left-3"
                    loading="lazy"
                  />
                )}
                <span className="w-[200px] text-start overflow-hidden text-ellipsis whitespace-nowrap">
                  {passWordRecord.title || "Untitled"}
                </span>
                {index === activeTab ? <UpArrow /> : <DownArrow />}
              </button>
              {index === activeTab && (
                <PasswordDetailContent
                  passWordRecord={passWordRecord}
                  handleRowClick={handleRowClick}
                  id={`password-details-${index}`}
                />
              )}
            </div>
          ))}
          {passwordsList?.length === 0 && !isLoading && (
            <div className="text-center text-white py-8">
              No passwords found
            </div>
          )}
        </div>
      </section>
    ),
    [
      passwordsList,
      activeTab,
      folderTitle,
      handleTabClick,
      handleRowClick,
      isLoading,
    ]
  );

  return isDesktop ? desktopView : mobileView;
};

export default PasswordFolder;
