import React from 'react'
import { Carousel } from 'react-bootstrap'
import { BannersData } from '../shared/ListOfBanners'

// TODO-CAROUSEL-1: Render a Carousel component from react-bootstrap
// Requirements:
//   1. Import BannersData from '../shared/ListOfBanners' (already done above)
//   2. Use BannersData.map(...) to render a <Carousel.Item> for each banner
//   3. Each Carousel.Item must contain:
//      - <img src={banner.image} ... />
//      - <Carousel.Caption> with banner.title and banner.caption
//   4. Number of .carousel-item elements must equal BannersData.length
export default function BannerCarousel() {
  return (
    <Carousel>
      {BannersData.map((banner, index) => (       
        <Carousel.Item key={index}>
          <img
            className="d-block w-100" 
            src={banner.image}
            alt={banner.title}
          />    
          <Carousel.Caption>
            <h3>{banner.title}</h3>
            <p>{banner.caption}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}