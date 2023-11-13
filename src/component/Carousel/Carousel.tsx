import CenterDiv from "@component/CenterDiv/CenterDiv";
import { SxProps, Theme, styled } from "@mui/material";
import React from "react";
import { ReactElement } from "react";

/**
 * Contains all the props of a Carousel component.
 */
export type CarouselProps = {
  /**
   * The elements to place inside the carousel.
   */
  children: ReactElement[],

  /**
   * The carousel container style to apply.
   */
  style?: SxProps<Theme>,
};

/**
 * An image carousel that allows you to slide elements to visualize them. 
 */
export default function Carousel({ children, style }: CarouselProps) {
  // Check the props
  if (children.length < 3) {
    throw "A carousel needs at least 3 elements.";
  }

  // Add a max width and max height property to the childrens style (so they don't overflow their container)
  const enhancedChildrens = children.map(c => React.cloneElement(c, {
    style: { 
      maxWidth: "100%",
      maxHeight: "100%",
      ...c.props.style
    } 
  }))

  return (
    <CenterDiv sx={{ height: "100%", border: "1px solid black", ...style }}>
      {
        enhancedChildrens.map(c => (<CarouselElement>{c}</CarouselElement>))
      }
    </CenterDiv>
  )
}

// TODO : Renommer en CarouselCenteredElement + documenter + position relative
const CarouselElement = styled("div")(() => ({
  width: "30%",
  aspectRatio: "1/1",
}));
