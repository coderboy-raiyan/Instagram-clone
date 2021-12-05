import React from "react";

const Story = ({ img, username }) => {
  return (
    <div>
      <img
        className="h-14 p-[1.7px] hover:scale-110 transform transition duration-200 ease-out border-red-500 object-contain border-2 w-14 cursor-pointer rounded-full"
        src={img}
        alt=""
      />
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  );
};

export default Story;
