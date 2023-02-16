import { Video } from "../../utils/Types";
import VideoCard from "./VideoCard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

//this seems to be the best carousel maker
//if this project had more time, it would be better to create
//a carousel from scratch, as it could be much better for the project's needs
import { Carousel } from "react-responsive-carousel";
import { CSSProperties } from "react";
interface props {
  sorting: "popular" | "hot" | "trending"; //this is just a template, not actually implemented, but it can be added to the backend search function
  videos: Video[];
  initialized: boolean;
}

export default function VideoCarousel(props: props) {
  const { videos, initialized, sorting } = props;
  const indicatorStyles: CSSProperties = {
    background: "#047857",
    width: 8,
    height: 8,
    display: "inline-block",
    margin: "-14px 8px",
    borderRadius: "50%",
    boxShadow: "0px 0px 1px 1px #d1fae5",
  };
  return (
    <>
      {!initialized ? (
        <>loading...</>
      ) : (
        <Carousel
          infiniteLoop
          centerMode
          centerSlidePercentage={30}
          renderIndicator={(onClickHandler, isSelected, index, label) => {
            if (isSelected) {
              return <li style={{ ...indicatorStyles, background: "#00e1c3" }} aria-label={`Selected: ${label} ${index + 1}`} title={`Selected: ${label} ${index + 1}`} />;
            }
            return <li style={indicatorStyles} onClick={onClickHandler} onKeyDown={onClickHandler} value={index} key={index} role="button" tabIndex={0} title={`${label} ${index + 1}`} aria-label={`${label} ${index + 1}`} />;
          }}
        >
          {videos
            .sort((a, b) => {
              //this would usually handle some basic sorts or filters. here we are mocking some random sorts
              if (sorting === "hot") {
                return a._id > b._id ? 1 : -1;
              } else if (sorting === "trending") {
                return a.shortId > b.shortId ? 1 : -1;
              } else {
                return 1;
              }
            })
            .map((video) => {
              return <VideoCard key={video.shortId} video={video}></VideoCard>;
            })}
        </Carousel>
      )}
    </>
  );
}
