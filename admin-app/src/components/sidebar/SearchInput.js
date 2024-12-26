import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUsers } from "../../features/customers/customerSlice";
import useConversation from "../../zustand/useConversation";
const SearchInput = () => {
  const [search, setSearch] = useState();
  const { setMessages, setSelectedConversation, selectedConversation } =
    useConversation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const customerState = useSelector((state) => state.customer.customers?.data);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = customerState.find((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("Không tìm thấy!!");
  };
  return (
    <form className="tw-flex tw-items-center tw-gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tìm kiếm"
        className="tw-w-[90%] tw-input tw-bg-white tw-file-input-bordered tw-rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="tw-btn tw-btn-circle tw-bg-sky-500 tw-text-white"
      >
        <FaSearch className="tw-w-6 tw-h-6 tw-outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
