import { useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState(props.video ?? "");

  useEffect(() => {
    setVideo(props.video ?? "");
  }, [props.video]);

  const handleMouseEnter = () => {
    if (props.video) {
      setIsVideo(true);
    }
  };

  const media = (
    <>
      {props.link && (
        <div className="work-link">
          <MdArrowOutward />
        </div>
      )}
      <img src={props.image} alt={props.alt} />
      {isVideo && video && (
        <video src={video} autoPlay muted playsInline loop></video>
      )}
    </>
  );

  return (
    <div className="work-image">
      {props.link ? (
        <a
          className="work-image-in"
          href={props.link}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
          target="_blank"
          rel="noreferrer"
          data-cursor="disable"
        >
          {media}
        </a>
      ) : (
        <div
          className="work-image-in"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
        >
          {media}
        </div>
      )}
    </div>
  );
};

export default WorkImage;
