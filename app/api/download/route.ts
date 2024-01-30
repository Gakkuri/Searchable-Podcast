import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import ytdl from "ytdl-core";
import { put } from "@vercel/blob";

export async function GET(request: NextRequest) {
  const youtubeLink = "https://www.youtube.com/watch?v=3XMQsDfipRE";
  // const youtubeLink = "https://www.youtube.com/watch?v=iv-C4CVGk28"

  // let to_stream = fs.createWriteStream("video.mp4");
  // let written = 0;
  // let info = await ytdl.getInfo("https://www.youtube.com/watch?v=iv-C4CVGk28");

  // console.log(info.formats);

  // let format = ytdl.chooseFormat(info.formats, {
  //   quality: "highestaudio",
  //   filter: "audioonly",
  // });
  // console.log(format);
  // let size = +format.contentLength;

  // console.log(size);
  let stream = await ytdl(youtubeLink, {
    quality: "highestaudio",
    filter: "audioonly",
  });
  // .on("close", () => {
  //   console.log("done");
  // })
  // .on("error", (err) => {
  //   console.error(err);
  // })
  // .on("data", (data) => {
  //   to_stream.write(data, () => {
  //     written += data.length;
  //     console.log(
  //       `written ${written} of ${size} bytes (${(
  //         (written / size) *
  //         100
  //       ).toFixed(2)}%)`
  //     );
  //   });
  // })
  // .pipe(fs.createWriteStream("video.mp4"));

  const blob = await put("audioonly.webm", stream, {
    access: "public",
  });

  return NextResponse.json(blob, { status: 200 });
}
