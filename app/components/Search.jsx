import { useState } from "react";
import { RiCloseLine, RiSearchLine } from "react-icons/ri";

export default function Search() {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <div className="border shadow-sm border-gray-300 bg-white rounded-md text-sm flex items-center justify-between">
      <span className="flex flex-shrink-0 items-center justify-center text-gray-400 w-11 h-11 rounded-md">
        <RiSearchLine size={22} />
      </span>
      <input
        type="text"
        placeholder="Search here..."
        className="h-12 w-full rounded-md outline-none"
        value={query}
        onChange={handleChange}
      />
      {query.length >= 1 && (
        <button
          className="p-1 m-1 hover:bg-gray-100 transition-colors ease-linear bg-transparent  rounded-full text-gray-400 flex-shrink-0"
          onClick={handleClear}>
          <RiCloseLine size={20} />
        </button>
      )}
    </div>
  );
}
