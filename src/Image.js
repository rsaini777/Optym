import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { saveAs } from "file-saver";

function Image({ results, pageNumber, pageRange }) {
  const download = (ImageResult) => {
    saveAs(ImageResult);
  };
  console.log(results)
  return (
    <div>
      {results.slice(pageNumber, pageRange).map((item) => (
        <div className=" d-flex">
          <div className="">
            <div className="card mt-5 cards mx-auto">
              <div className="card-body">
                <LazyLoadImage
                  effect="blur"
                  alt=""
                  key={item.id}
                  src={item.urls.regular}
                  className="images"
                ></LazyLoadImage>
                <div className="d-flex justify-content-between ">
                  <div >
                    <img alt="" className="avatar" src={item.user.profile_image.medium}></img>
                  </div>
                  <div className="text-start ">
                    <h5 className="personal-info ">{item.user.name}</h5>
                    <p className="likes ">{item.likes} Likes recieved</p>
                  </div>
                  <div className="download">
                  
                    <button
                      className="downlaod-btn btn  "
                      onClick={() => download(`${item.links.download}`)}
                    >
                      <i class="ri-download-2-line display-6"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Image;
