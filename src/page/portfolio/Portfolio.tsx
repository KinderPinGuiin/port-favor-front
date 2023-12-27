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

export default function Portfolio() {
  const images = [
    { src: "https://picsum.photos/800", alt: "Image 1" },
    { src: "https://picsum.photos/900", alt: "Image 2" },
    { src: "https://picsum.photos/1200", alt: "Image 3" },
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
            {images.map((image, i) => (
              <img src={image.src} alt={image.alt} key={i} />
            ))}
          </ElementCarousel>
        </CenterDiv>
      </section>
    </>
  );
}
