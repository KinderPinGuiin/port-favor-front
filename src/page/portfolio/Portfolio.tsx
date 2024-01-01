import ElementCarousel from "@component/Carousel/ElementCarousel";
import CenterDiv from "@component/CenterDiv/CenterDiv";
import ElementGrid from "@component/ElementGrid/ElementGrid";
import CenteredModal from "@component/CenteredModal/CenteredModal";
import { useEffect, useState } from "react";
import ImageCard from "@component/ImageCard/ImageCard";
import ImageResponseDTO from "@api/dto/response/image/ImageResponseDTO";
import useApi from "@hook/api/useApi";
import APIEndpoint from "@api/endpoint/APIEndpoint";
import { fill } from "@utils/list-utils";
import { Box } from "@mui/material";

export default function PublicPortfolio() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageResponseDTO | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [images, setImages] = useState<ImageResponseDTO[]>([]);

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem('token')));
  }, []);

  const handleImageClick = (image: ImageResponseDTO) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const token = localStorage.getItem("token");

  // Get the images skeletons
  const { data } = useApi(APIEndpoint.GET_IMAGES_SKELETON);
  useEffect(() => {
    if (data) {
      setImages(data.elements);
    }
  }, [data])

  const carouselImages = images.length < 3 
    ? fill(
      images,
      {id: 0, description: "Prochainement", name: "Prochainement", mime: "image/png", pub: true, path: "" },
      images.length,
      2
    ) 
    : images.slice(-3).reverse();
  const publicImages = images.filter(image => image.pub);
  const privateImages = images.filter(image => !image.pub);

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
          <ElementCarousel style={{ height: "80%", width: "60%", cursor: "pointer" }}>
            {carouselImages.map((image, i) => (
              <img src={image.path == "" ? "" : APIEndpoint.GET_IMAGE_CONTENT.toApiUrl().replace("{name}", image.path) + (token != null ? "?token=" + token : "")} 
                alt={image.description}
                key={i}
                onDoubleClick={image.path == "" ? () => 0 : () => handleImageClick(image)}
                />
            ))}
          </ElementCarousel>
        </CenterDiv>
      </section>
      {/* Public images grid */}
      <section>
        <h1
          style={{
            textAlign: "center",
            margin: 0,
            padding: "20px",
            fontSize: "2.5em",
          }}
        >
          Nos publications
        </h1>
        {
          publicImages.length == 0 
          ? <CenterDiv>Aucune publication publique pour le moment.</CenterDiv> 
          : <ElementGrid
              elementStyle={{ width: "20%", aspectRatio: "1/1" }}
              animate
            >
              {publicImages.map((image, i) => (
                <img 
                  src={APIEndpoint.GET_IMAGE_CONTENT.toApiUrl().replace("{name}", image.path)} 
                  alt={image.description} 
                  key={i} 
                  onDoubleClick={() => handleImageClick(image)}
                  />
              ))}
            </ElementGrid>
        }
      </section>
      {/* Private images grid */}
      { isLoggedIn && privateImages.length > 0 &&
      <section>
        <h1
          style={{
            textAlign: "center",
            margin: 0,
            padding: "20px",
            fontSize: "2.5em",
          }}
        >
          Nos publications privées
        </h1>
        <ElementGrid
          elementStyle={{ width: "20%", aspectRatio: "1/1" }}
          animate
        >
          {privateImages.map((image, i) => (
            <img 
              src={APIEndpoint.GET_IMAGE_CONTENT.toApiUrl().replace("{name}", image.path) + (token != null ? "?token=" + token : "")} 
              alt={image.description} 
              key={i} 
              onDoubleClick={() => handleImageClick(image)}
              />
          ))}
        </ElementGrid>
      </section>
      }
      <Box sx={{ marginBottom: "70px" }}></Box>
      <CenteredModal open={isModalOpen} handleClose={() => closeModal()} sx={{ }}>
        {selectedImage && <ImageCard image={selectedImage} />}
      </CenteredModal>
    </>
  );
}
