import React from "react";
import Post from "./Post";

const posts = [
  {
    id: "123",
    userName: "Tajkier Haque Raiyan",
    userImg: "https://avatars.githubusercontent.com/u/76396442?v=4",
    img: "https://avatars.githubusercontent.com/u/76396442?v=4",
    caption: "Subscribe and destroy the like button",
  },
  {
    id: "123",
    userName: "Tajkier Haque Raiyan",
    userImg: "https://avatars.githubusercontent.com/u/76396442?v=4",
    img: "https://avatars.githubusercontent.com/u/76396442?v=4",
    caption: "Subscribe and destroy the like button",
  },
  {
    id: "123",
    userName: "Tajkier Haque Raiyan",
    userImg: "https://avatars.githubusercontent.com/u/76396442?v=4",
    img: "https://avatars.githubusercontent.com/u/76396442?v=4",
    caption: "Subscribe and destroy the like button",
  },
  {
    id: "123",
    userName: "Tajkier Haque Raiyan",
    userImg: "https://avatars.githubusercontent.com/u/76396442?v=4",
    img: "https://avatars.githubusercontent.com/u/76396442?v=4",
    caption: "Subscribe and destroy the like button",
  },
];

const Posts = () => {
  return (
    <div>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Posts;
