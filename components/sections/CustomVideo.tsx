import React, { useEffect, useRef } from "react";
interface Props {
  src: string;
  width: string;
  height: string;
  videoStyles?: any;
  loop?: boolean;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry: any) => {
      if (!entry.isIntersecting) {
        entry.target.pause();
        entry.target.currentTime = 0;
        //   playState = false;
      } else {
        entry.target.play();
        //   playState = true;
      }
    });
  },
  { rootMargin: "-15% 0% -15% 0%" }
);

const CustomVideo: React.FC<Props> = (props) => {
  const videoRef = useRef<any>();

  useEffect(() => {
    if (videoRef) {
      observer.observe(videoRef.current!);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      style={props.videoStyles}
      autoPlay
      loop={props.loop}
      muted
      width={props.width}
      height={props.height}
    >
      <source src={props.src} />
    </video>
  );
};

export default CustomVideo;
