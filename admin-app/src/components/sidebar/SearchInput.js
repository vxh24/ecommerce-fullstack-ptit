import React from 'react'
import { FaSearch } from "react-icons/fa";
const SearchInput = () => {
  return (
    <form className='tw-flex tw-items-center tw-gap-2'>
      <input type="text" placeholder='Tìm kiếm' className='tw-w-[90%] tw-input tw-bg-white tw-file-input-bordered tw-rounded-full' />
      <button type='submit' className='tw-btn tw-btn-circle tw-bg-sky-500 tw-text-white'>
        <FaSearch className='tw-w-6 tw-h-6 tw-outline-none' />
      </button>
    </form>
  )
}

export default SearchInput