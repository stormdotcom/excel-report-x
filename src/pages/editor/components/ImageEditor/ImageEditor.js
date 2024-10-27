import React, { useState } from "react";
import Toolbar from "./Toolbar";
import Canvas from "./Canvas/Canvas";
import { useSelector } from "react-redux";
import { STATE_SLICE_KEY } from "../constants";

const ImageEditor = ({ canvasRef, imageRef }) => {
  const [selectedShape, setSelectedShape] = useState("circle");
  const [color, setColor] = useState("#000000");
  const selectedLabel = useSelector(state => state[STATE_SLICE_KEY]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Toolbar canvasRef={canvasRef} imageRef={imageRef} selectedShape={selectedShape} setSelectedShape={setSelectedShape} color={color} setColor={setColor} />
      <Canvas canvasRef={canvasRef} imageRef={imageRef} selectedShape={selectedShape} color={color} selectedLabel={selectedLabel} />
    </div>
  );
};

export default ImageEditor;
