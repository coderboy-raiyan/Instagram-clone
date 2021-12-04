import React, { useEffect, useState } from "react";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=5")
      .then((res) => res.json())
      .then((data) => setSuggestions(data.results));
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-sm font-bold text-gray-400">Suggestions for you</h1>
        <button className="font-semibold text-gray-600">See All</button>
      </div>

      {suggestions.map((sug, id) => {
        return (
          <div
            key={sug.login.password}
            className="flex items-center justify-between mt-3 space-x-3"
          >
            <img
              className="w-10 h-10 rounded-full border p-[2px]"
              src={sug.picture.thumbnail}
              alt=""
            />
            <div className="flex-1 ml-4">
              <h2 className="font-semibold text-sm">
                {sug.name.first + " " + sug.name.last}
              </h2>
              <h3 className="text-sm text-gray-400">
                {sug.location.city} {sug.location.state}
              </h3>
            </div>

            <button className="text-xs text-blue-400 font-bold">Follow</button>
          </div>
        );
      })}
    </div>
  );
};

export default Suggestions;
