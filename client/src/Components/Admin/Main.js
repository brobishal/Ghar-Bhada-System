import React, { useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
const Main = () => {
  // for while refereshing the for request immediately
  useEffect(() => {}, []);
  return (
    <>
      <AdminLogin />
    </>
  );
};

export default Main;
