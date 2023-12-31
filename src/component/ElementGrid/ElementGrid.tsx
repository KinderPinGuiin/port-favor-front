import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import { ReactElement } from "react";
import { Zoom } from "react-awesome-reveal";

/**
 * The ElementGrid properties.
 */
export type ElementGridProps = {
  /**
   * Indicates if the elements has to be animated or not with a zoom effect (default: false).
   */
  animate?: boolean;

  elementStyle: React.CSSProperties;

  /**
   * The elements to place on a grid.
   */
  children: ReactElement[];
};

/**
 * A grid containing the given elements.
 */
export default function ElementGrid({
  children,
  animate,
  elementStyle,
}: ElementGridProps) {
  // Animate the elements if needed
  const enhancedChildrens: ReactNode[] = [];
  if (animate) {
    children.forEach((c, i) =>
      enhancedChildrens.push(
        <Zoom key={i} style={elementStyle} triggerOnce>
          {React.cloneElement(c, {
            style: { maxWidth: "100%", maxHeight: "100%" },
          })}
        </Zoom>
      )
    );
  } else {
    // Otherwise just add the required style
    children.forEach((c) =>
      enhancedChildrens.push(
        React.cloneElement(c, {
          style: elementStyle,
        })
      )
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center",
      }}
    >
      {enhancedChildrens}
    </Box>
  );
}
