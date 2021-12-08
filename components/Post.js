import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import initializeAuth from "./../Firebase/Firebase.init";

const Post = ({ post, postId }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const { db, storage } = initializeAuth();
  const [likes, setLikes] = useState([]);

  // get the likes from db
  useEffect(
    () =>
      onSnapshot(query(collection(db, "posts", postId, "likes")), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, postId]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) != -1
      ),
    [likes, postId]
  );

  console.log(hasLiked);

  // send likes to db
  const likePost = async () => {
    if (session?.user?.username) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", postId, "likes", session.user.uid));
      } else {
        await setDoc(doc(db, "posts", postId, "likes", session.user.uid), {
          username: session.user.username,
        });
      }
    } else {
      alert("Please log in ");
    }
  };

  // Get the comments form db
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", postId, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, postId]
  );

  // send comments to the db
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: commentToSend,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white mt-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5 justify-between">
        <img
          className="rounded-full h-12 w-12 border p-1 mr-3"
          src={post.profileImg}
          alt=""
        />
        <p className="flex-1 font-bold">{post.username}</p>
        <DotsHorizontalIcon className="h-5 " />
      </div>

      {/* Image */}
      <img src={post.image} className="object-cover w-full" alt="" />

      {/* Buttons */}
      <div className="justify-between flex px-4 pt-4">
        <div className="flex space-x-4">
          {hasLiked ? (
            <HeartIconFilled onClick={likePost} className="btn text-red-500" />
          ) : (
            <HeartIcon onClick={likePost} className="btn" />
          )}
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>

        <BookmarkIcon className="btn" />
      </div>

      {/* caption */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} Likes</p>
        )}
        <span className="font-bold mr-1">{post.username}</span>{" "}
        {post.captionRef}
      </p>

      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => {
            return (
              <div
                className="items-center flex space-x-2 mb-3 "
                key={comment.id}
              >
                <img
                  className="h-7 rounded-full"
                  src={comment.data().userImage}
                  alt=""
                />
                <p className="flex-1 text-sm">
                  <span className="font-bold">{comment.data().username}</span>{" "}
                  <span>{comment.data().comment}</span>
                </p>
                <p className="text-xs font-semibold px-3 text-gray-500">
                  <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
                </p>
              </div>
            );
          })}
        </div>
      )}

      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7 " />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            className="font-semibold text-blue-300"
            onClick={sendComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
