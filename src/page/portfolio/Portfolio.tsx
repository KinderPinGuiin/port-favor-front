/*
 * TODO
 * - Design du portfolio
 * - Animation au scroll (images)
 * - Animation au scroll (background) ?
 * - Adapter les options d'api pour prendre une url custom
 * - Adapter les options d'api pour customiser le retour (pas seulement json : binaire)
 */

import Carousel from "@component/Carousel/Carousel";
import CenterDiv from "@component/CenterDiv/CenterDiv";

export default function Portfolio() {
  const images = [
    { src: "https://picsum.photos/500", alt: "Image 1" },
    { src: "https://picsum.photos/500", alt: "Image 2" },
    { src: "https://picsum.photos/500", alt: "Image 3" },
  ];

  return (
    <CenterDiv sx={{ height: "100vh" }}>
      <Carousel style={{ height: "70%", width: "90%" }} >
        {images.map(image => (<img src={image.src} alt={image.alt} />))}
        {/* {images.map((_, i) => (<h2>Test {i}</h2>))} */}
      </Carousel>
    </CenterDiv>
  )
}
