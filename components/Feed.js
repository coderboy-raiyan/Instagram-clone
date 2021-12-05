import { useSession } from "next-auth/react";
import React from "react";
import MinProfile from "./MinProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

const Feed = () => {
  const { data: session } = useSession();
  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl lg:max-w-6xl xl:max-w-6xl mx-auto lg:grid-cols-3 xl:grid-cols-3 ${
        !session && "!grid-cols-1 !max-w-3xl"
      }`}
    >
      <section className="col-span-2 lg:max-w-2xl lg:mx-auto">
        <Stories />
        <Posts />
      </section>

      <section className="hidden  xl:inline-grid lg:inline-grid">
        {session && (
          <div className="fixed top">
            <MinProfile />
            <Suggestions />
          </div>
        )}
      </section>
    </main>
  );
};

export default Feed;
