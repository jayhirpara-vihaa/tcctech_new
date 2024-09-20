import { useEffect, useRef } from "react";

type Iprops = {
  src: string;
};

const Video = (props: Iprops) => {
  const { src } = props;
  const videoRef = useRef();
  useEffect(() => {
    videoRef.current?.load();
  }, [src]);

  return (
    <video ref={videoRef} className="w-full h-full" width="100%" autoPlay loop>
      <source src={src} type="video/webm" />
      <source src={src} type="video/mp4" />
      Sorry, your browser doesn't support videos.
    </video>
  );
};

export default Video;
