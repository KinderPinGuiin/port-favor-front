import { Box, SxProps, Theme } from "@mui/material";
import { config } from "@react-spring/web";
import { useMemo, useState } from "react";
import { ReactElement } from "react";
import Carousel from "react-spring-3d-carousel";

/**
 * Contains all the props of an ElementCarousel component.
 */
export type CarouselProps = {
  /**
   * The elements to place inside the carousel.
   */
  children: ReactElement[];

  /**
   * Indicates if navigation arrows has to be shown under the carousel (default: false).
   */
  showNavigation?: boolean;

  /**
   * The carousel container style to apply.
   */
  style?: SxProps<Theme>;
};

/**
 * An element carousel that allows you to slide elements to visualize them.
 */
export default function ElementCarousel({
  children,
  style,
  showNavigation,
}: CarouselProps) {
  // Check the props
  if (children.length < 3) {
    throw "A carousel needs at least 3 elements.";
  }

  const [goToSlide, setGoToSlide] = useState(0);

  // Add a max width and max height property to the childrens style (so they don't overflow their container)
  const enhancedChildrens = useMemo(
    () =>
      children.map((c, i) => ({
        key: `${i}`,
        content: c,
        onClick: () => setGoToSlide(i),
      })),
    [children]
  );

  return (
    <Box sx={style}>
      <Carousel
        slides={enhancedChildrens}
        goToSlide={goToSlide}
        showNavigation={showNavigation ?? false}
        animationConfig={config.gentle}
      />
    </Box>
  );
}
