import { useEffect, useState } from "react";
import { RiCloseLine, RiSearchLine } from "react-icons/ri";
import AppsList from "../db/db.local.json";

export default function Search() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResults] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleClear = () => {
    setQuery("");
  };

  useEffect(() => {
    const result = AppsList.apps.filter((item) =>
      item.name.match(new RegExp(`${query}`, "i"))
    );
    setSearchResults(result);
  }, [query]);

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
