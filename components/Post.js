import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import React from "react";

const Post = ({ post }) => {
  return (
    <div className="bg-white mt-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5 justify-between">
        <img
          className="rounded-full h-12 w-12 border p-1 mr-3"
          src={post.userImg}
          alt=""
        />
        <p className="flex-1 font-bold">{post.userName}</p>
        <DotsHorizontalIcon className="h-5 " />
      </div>

      {/* Image */}
      <img src={post.img} className="object-cover w-full" alt="" />

      {/* Buttons */}
      <div className="justify-between flex px-4 pt-4">
        <div className="flex space-x-4">
          <HeartIcon className="btn" />
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>

        <BookmarkIcon className="btn" />
      </div>

      {/* caption */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{post.userName}</span> {post.caption}
      </p>

      {/* comments */}

      {/* input box */}
      <form className="flex items-center p-4">
        <EmojiHappyIcon className="h-7 " />
        <input
          type="text"
          placeholder="Add a comment..."
          className="border-none flex-1 focus:ring-0 outline-none"
        />
        <button className="font-semibold text-blue-200">Post</button>
      </form>
    </div>
  );
};

export default Post;
