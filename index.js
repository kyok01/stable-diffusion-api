import fetch from "node-fetch";
import fs from "fs/promises";

const url = "https://506dde3e81a7f5976b.gradio.live/sdapi/v1/txt2img";
const data = {
  prompt: "warehouse entrance",
  model: "model",
  length: 256,
  temperature: 0.7,
  top_k: 40,
  top_p: 0.9,
  repetition_penalty: 1.0,
  repetition_penalty_range: 512,
  repetition_penalty_slope: 3.33,
};
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
};
fetch(url, options)
  .then((response) => response.json())
  .then((data) => saveImage(data["images"][0]));

function saveImage(base64DataWithoutHeader) {
  const bufferData = Buffer.from(base64DataWithoutHeader, "base64");
  const date = new Date();
  const fileName = `image_${date.getFullYear()}_${
    date.getMonth() + 1
  }_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}.png`;
  fs.writeFile(fileName, bufferData, { encoding: "base64" }, function (err) {
    console.log("File created");
  });
}
