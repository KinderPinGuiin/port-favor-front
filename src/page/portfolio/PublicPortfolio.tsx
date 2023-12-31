/*
 * TODO
 * - Design du portfolio
 * - Animation au scroll (images)
 * - Animation au scroll (background) ?
 * - Adapter les options d'api pour prendre une url custom
 * - Adapter les options d'api pour customiser le retour (pas seulement json : binaire)
 */

import ElementCarousel from "@component/Carousel/ElementCarousel";
import CenterDiv from "@component/CenterDiv/CenterDiv";
import ElementGrid from "@component/ElementGrid/ElementGrid";
import CenteredModal from "@component/CenteredModal/CenteredModal";
import { useState } from "react";
import ImageCard from "@component/ImageCard/ImageCard";

export default function PublicPortfolio() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
   };

  const carouselImages = [
    { src: "https://picsum.photos/200", alt: "Image 1" },
    { src: "https://picsum.photos/300", alt: "Image 2" },
    { src: "https://picsum.photos/800", alt: "Image 3" },
  ];

  const gridImages = [
    { src: "https://picsum.photos/800", alt: "Image 1" },
    { src: "https://picsum.photos/800", alt: "Image 2" },
    { src: "https://picsum.photos/800", alt: "Image 3" },
    { src: "https://picsum.photos/800", alt: "Image 4" },
    { src: "https://picsum.photos/800", alt: "Image 5" },
    { src: "https://picsum.photos/800", alt: "Image 6" },
    { src: "https://picsum.photos/800", alt: "Image 7" },
    { src: "https://picsum.photos/800", alt: "Image 8" },
    { src: "https://picsum.photos/800", alt: "Image 9" },
    { src: "https://picsum.photos/800", alt: "Image 10" },
    { src: "https://picsum.photos/800", alt: "Image 11" },
    { src: "https://picsum.photos/800", alt: "Image 12" },
    { src: "https://picsum.photos/800", alt: "Image 13" },
  ];

  return (
    <>
      {/* Last publication section */}
      <section>
        <h1
          style={{
            textAlign: "center",
            height: "10vh",
            margin: 0,
            paddingTop: "30px",
            fontSize: "2.5em",
          }}
        >
          Nos dernières publications
        </h1>
        <CenterDiv sx={{ height: "90vh" }}>
          <ElementCarousel style={{ height: "80%", width: "60%" }}>
            {carouselImages.map((image, i) => (
              <img src={image.src} alt={image.alt} key={i} onDoubleClick={() => handleImageClick(image)}/>
            ))}
          </ElementCarousel>
        </CenterDiv>
      </section>
      {/* Element grid section */}
      <section style={{ marginBottom: "70px" }}>
        <h1
          style={{
            textAlign: "center",
            height: "10vh",
            margin: 0,
            paddingBottom: "80px",
            fontSize: "2.5em",
          }}
        >
          Nos publications publiques
        </h1>
        <ElementGrid
          elementStyle={{ width: "20%", aspectRatio: "1/1" }}
          animate
        >
          {gridImages.map((image, i) => (
            <img src={image.src} alt={image.alt} key={i} onDoubleClick={() => handleImageClick(image)}/>
          ))}
        </ElementGrid>
      </section>
      <CenteredModal open={isModalOpen} handleClose={() => closeModal()} sx={{ }}>
      {selectedImage && <ImageCard image={selectedImage} />}
      </CenteredModal>
    </>
  );
}
