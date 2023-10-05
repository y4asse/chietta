import React from "react";
import Layout from "~/components/layout/layout";

const NotFound = () => {
  return (
    <Layout>
      <div>
        <h1 className="p-10 text-center text-4xl">
          お探しのページが
          <br />
          見つかりません
        </h1>
        <img
          src="/img/cat.png"
          alt="猫の写真"
          width={300}
          className="mx-auto"
        />
      </div>
    </Layout>
  );
};

export default NotFound;
