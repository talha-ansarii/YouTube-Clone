import React, { useState } from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import VideoLength from "../shared/VideoLength";
import ReactPlayer from "react-player";
import { Navigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  return (
    <Link to={`/video/${video?.videoId}`}>
      <div
        onMouseEnter={() => setHover  (true)}
        onMouseLeave={() => setHover(false)}
        className="flex flex-col mb-8 group"
      >
        <div className="relative h-48 md:rounded-xl overflow-hidden ">
          <div className="">
            {hover ? (
              <ReactPlayer
                onPause={() => navigate(`/video/${video?.videoId}`)}
                url={`https://www.youtube.com/watch?v=${video.videoId}`}
                width="100%"
                height="100%"
                playing={hover}
                playIcon={""}
                controls
                muted
              />
            ) : (
              <img
                className="h-full w-full object-cover"
                src={video?.thumbnails?.[0]?.url}
              />
            )}
          </div>
          {video?.lengthSeconds && <VideoLength time={video?.lengthSeconds} />}
        </div>
        <div className="flex text-white mt-3">
          <div className="flex items-start">
            <div className="flex h-9 w-9 rounded-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={video?.author?.avatar?.[0]?.url}
              />
            </div>
          </div>
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-sm font-bold line-clamp-2">
              {video?.title}
            </span>
            <span className="text-[12px] font-semibold text-white/[0.7] flex items-center">
              {video?.author?.title}
              {video?.author?.badges?.[0]?.type === "VERIFIED_CHANNEL" && (
                <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1 " />
              )}
            </span>
            <div className="flex text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden ">
              <span>{`${abbreviateNumber(video?.stats?.views, 2)} views`}</span>
              <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                .
              </span>
              <span className="truncate">{video?.publishedTimeText}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
