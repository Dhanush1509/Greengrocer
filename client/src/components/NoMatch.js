import React from 'react'
import {Container} from 'react-bootstrap'
import Lottie from "react-lottie";
import animationData from "../assets/reactLottie/404.json";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
function NoMatch() {
    return (
      <>
        <Lottie
          options={defaultOptions}
          style={{ width: "56%", height: "auto" }}
        />
      </>
    );
}

export default NoMatch
