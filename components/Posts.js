import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import initializeAuth from "./../Firebase/Firebase.init";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { db } = initializeAuth();

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div>
      {posts.map((post, id) => {
        return <Post key={id} post={post.data()} />;
      })}
    </div>
  );
};

export default Posts;
