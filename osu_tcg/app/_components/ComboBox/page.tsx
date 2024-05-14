import { useState } from "react";

const ComboBox = ({
  title,
  listData,
  query,
  setQuery,
  filtering,
}: {
  title: string;
  listData: string[];
  query: string;
  setQuery: (value: string | ((prevQuery: string) => string)) => void;
  filtering: boolean;
}) => {
  const [inputFocus, setInputFocus] = useState(false);
  const filteredList =
    query === "" || !filtering
      ? listData
      : listData.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase()),
        );
  const valid = listData
    .map((item) => item.toLowerCase())
    .includes(query.toLowerCase());

  return (
    <div className="flex flex-row">
      <p className="font-bold mx-2">{title}</p>
      <div className="relative">
        <input
          onClick={() => {
            setInputFocus(true);
            setQuery("");
          }}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") setInputFocus(false);
          }}
          value={query}
          className={valid ? "w-full bg-gray-200" : "w-full bg-red-200"}
        />
        <div className="absolute z-10 bg-white w-full max-h-60 overflow-y-scroll">
          {inputFocus &&
            filteredList.map((item, id) => (
              <div
                key={`select-item-${id}`}
                className="hover:bg-gray-200 select-none"
                onClick={() => {
                  setQuery(item);
                  setInputFocus(false);
                }}
              >
                {item}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ComboBox;
