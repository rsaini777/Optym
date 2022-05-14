import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Image({results,pageNumber,pageRange}) {
  return (
    <div>
         {
        results
         .slice(pageNumber, pageRange)
         .map((item)=>(
          <LazyLoadImage effect="blur" alt="" key={item.id} src={item.urls.small}></LazyLoadImage>
        ))
      }
    </div>
  )
}

export default Image