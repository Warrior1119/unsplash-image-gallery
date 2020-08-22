import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Lightbox from 'lightbox-react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(-1);

  const fetchImages = (count = 10) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = "EMUszNOYObvJTytikmrEsviedEh_1bWspDSYC1P5jJ4";

    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then(res => {
        setImages([...images, ...res.data]);
        setLoaded(true);
      });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const onClickImage = (index) => {
    setImageIndex(index);
    setOpen(true);
  }

  return (
    <div className="hero is-fullheight is-bold is-info">
      <div className="hero-body">
        <div className="container">
          <div className="header content">
            <h1>
              Unsplash Image Gallery
            </h1>
          </div>

          <InfiniteScroll
            dataLength={images}
            next={() => fetchImages(10)}
            hasMore={true}
            loader={
              <h4>Loading...</h4>
            }
          >
            <div className="image-grid" style={{ marginTop: "30px" }}>
              {loaded
                ? images.map((image, index) => (
                  <div className="image-item" key={index} onClick={() => onClickImage(index)} >
                    <img src={image.urls.regular} alt="" />
                  </div>
                ))
                : ""}
            </div>
          </InfiniteScroll>
          {open && (
            <Lightbox
              mainSrc={images[imageIndex].urls.full}
              nextSrc={images[(imageIndex + 1) % images.length].urls.full}
              prevSrc={images[(imageIndex + images.length - 1) % images.length].urls.full}
              onCloseRequest={() => setOpen(false)}
              onMovePrevRequest={() => setImageIndex((imageIndex + images.length - 1) % images.length)}
              onMoveNextRequest={() => setImageIndex((imageIndex + 1) % images.length)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;