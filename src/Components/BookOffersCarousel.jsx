import { Carousel } from "react-bootstrap";
import "../styles/BookOffersCarousel.css";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

export default function BookOffersCarousel() {
  return (
    <div className="carousel-full-wrapper mb-4" >
      <Carousel interval={8000}  fade indicators={false}>
        <Carousel.Item>
          <img className="d-block w-100 carousel-img" src={img1} alt="Immagine 1" />
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100 carousel-img" src={img2} alt="Offerte" />
          <Carousel.Caption>
            <h1 className="carousel-title">Tante offerte interessanti</h1>
            <p className="carousel-subtitle">I libri da leggere almeno una volta nella vita</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100 carousel-img" src={img3} alt="Libri digitali" />
          <Carousel.Caption>
            <h1 className="carousel-title">PROMUOVERE E RACCONTARE I LIBRI ONLINE</h1>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100 carousel-img" src={img4} alt="Offerta 3x2" />
          <Carousel.Caption>
            <h1 className="carousel-title">Prendi due libri, il terzo è gratis</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
