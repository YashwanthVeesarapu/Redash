import React from "react";
import MainLayout from "../layouts/MainLayout";

import "./styles.scss";

const PreLaunchPage = () => {
  return (
    <MainLayout page={"prelaunch"}>
      <div className="pre-launch">
        <h2>launching Soon...</h2>
      </div>
    </MainLayout>
  );
};

export default PreLaunchPage;
