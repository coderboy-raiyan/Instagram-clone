import React from "react";
import Stories from "./Stories";

const Feed = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-2 lg:max-w-6xl xl:max-w-6xl mx-auto">
      <section>
        {/* stories */}
        <Stories />
        {/* posts */}
      </section>

      <section>
        {/* main profile */}
        {/* Suggestions */}
      </section>
    </main>
  );
};

export default Feed;
