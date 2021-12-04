import React, { useEffect, useState } from "react";
import Story from "./Story";

const Stories = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // const suggestion = [...Array(20)].map((_, i) => ({
    //   ...faker.helpers.contextualCard(),
    //   id: i,
    // }));
    // setSuggestions(suggestion);

    fetch("https://randomuser.me/api/?results=20")
      .then((res) => res.json())
      .then((data) => setSuggestions(data.results));
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 overflow-x-scroll border-gray-200 border rounded scrollbar-thin scrollbar-thumb-black">
      {suggestions.map((profile, index) => {
        return <Story key={profile.login.password} profile={profile} />;
      })}
    </div>
  );
};

export default Stories;
