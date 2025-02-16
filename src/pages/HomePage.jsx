import React from "react";
import MainLayout from "../layouts/MainLayout";

import "./styles.scss";

const HomePage = () => {
  return (
    <MainLayout page="home">
      <div className="about">
        <h1>Meet MrRedash – The Brand, The Creator, The Deal Hunter</h1>

        <p>
          Welcome to <span class="highlight">MrRedash</span>, where{" "}
          <strong>fashion, deals, and music</strong> collide!
        </p>

        <h2>🔥 Merch That Speaks for Itself</h2>
        <p>
          Represent the MrRedash vibe with stylish, high-quality apparel
          designed for those who embrace boldness and authenticity. Every piece
          is crafted with comfort, individuality, and timeless appeal in mind.
        </p>

        <h2>💰 Deals You Can’t Miss</h2>
        <p>
          Follow <span class="highlight">@mr_redash</span> on{" "}
          <strong>X/Twitter</strong> for the hottest deals across fashion, tech,
          and lifestyle. MrRedash scouts the best discounts so you don’t have
          to—helping you save while staying ahead of the trends.
        </p>

        <h2>🎵 Music That Hits Different</h2>
        <p>
          Beyond fashion and deals,{" "}
          <span class="highlight">MrRedash is a music producer</span>, creating
          beats that resonate with passion and energy. Whether it's hard-hitting
          drops or smooth melodies, the sound of MrRedash is all about making an
          impact.
        </p>

        <p>
          Join the <strong>MrRedash movement</strong>—where style, savings, and
          sound come together.
        </p>
      </div>
    </MainLayout>
  );
};

export default HomePage;
