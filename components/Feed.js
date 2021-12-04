import React from "react";
import Posts from "./Posts";
import Stories from "./Stories";

const Feed = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl lg:max-w-6xl xl:max-w-6xl mx-auto lg:grid-cols-3 xl:grid-cols-3">
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      <section>
        {/* main profile */}
        {/* Suggestions */}
      </section>
    </main>
  );
};

export default Feed;
