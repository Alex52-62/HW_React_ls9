import { useEffect, useState } from "react";
import axios from "axios";

export const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (fetching) {
      axios
        .get(
          `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`
        )
        .then((response) => {
          setPhotos([...photos, ...response.data]);
          setCurrentPage((prevState) => prevState + 1);
          setTotalCount(response.headers["x-total-count"]);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching, photos, currentPage]);

  useEffect(() => {
    const scrollHandler = (e) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
          100 &&
        photos.length < totalCount
      ) {
        setFetching(true);
      }
    };

    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [photos.length, totalCount]);

  return (
    <div className="Photos">
      {photos.map((photo, idx) => (
        <div className="photo" key={idx}>
          <div className="title">
            {photo.id}
            {photo.title}
          </div>
          <img src={photo.thumbnailUrl} alt="thumbnail" />
        </div>
      ))}
    </div>
  );
};
