import React, { ReactNode } from "react";

const WrapContainer = ({ children }: { children: ReactNode }) => {
  return <div className="mx-4">{children}</div>;
};

export default WrapContainer;
