import React from "react";

const MinProfile = () => {
  return (
    <div className="flex justify-center items-center mt-14 ml-10 space-x-3">
      <img
        className="rounded-full border p-[2px] w-16 h-16"
        src="https://avatars.githubusercontent.com/u/76396442?v=4"
        alt=""
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">Raiyan</h2>
        <h3 className="text-gray-400 text-sm">Welcome to instagram</h3>
      </div>
      <button className="text-blue-400 text-sm font-semibold">Sign out</button>
    </div>
  );
};

export default MinProfile;
