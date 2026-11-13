import React from "react";
import { Composition } from "remotion";
import { MeelteBakeryReel } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MeelteBakeryReel"
      component={MeelteBakeryReel}
      durationInFrames={750}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
