import APIEndpoint from "@api/endpoint/APIEndpoint";
import { useEffect, useState } from "react";
import ImageResponseDTO from "../../api/dto/response/image/ImageResponseDTO";
import useApi from "@hook/api/useApi";

export function useRandomImage() {
  const [images, setImages] = useState<ImageResponseDTO[]>([]);
  const token = localStorage.getItem("token");

  // Get the images skeletons
  const { data } = useApi(APIEndpoint.GET_IMAGES_SKELETON);
  useEffect(() => {
    if (data) {
      setImages(data.elements);
    }
  }, [data])

  // Get a random image
  const getRandomImage = () => {
    if (images.length > 0) {
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex];
    } else {
      return {id: 0, description: "Prochainement", name: "Prochainement", mime: "image/png", pub: true, path: "" };
    }
  };

  const randomImage = getRandomImage();
  
  return {
    src: randomImage?.path == "" ? "" : APIEndpoint.GET_IMAGE_CONTENT.toApiUrl().replace("{name}", randomImage?.path) + (token != null ? "?token=" + token : ""), 
    alt: randomImage?.description
  }
}
