import React from "react";
import { SnapCarousel } from "../SnapCarousel";
import { ProductSlide, type ProductCardData } from "./ProductSlide";

type ProductCarouselProps = {
  items: ProductCardData[];
  ariaLabel?: string;
};

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ items, ariaLabel }) => (
  <SnapCarousel ariaLabel={ariaLabel}>
    {items.map((data, index) => (
      <ProductSlide key={index} data={data} />
    ))}
  </SnapCarousel>
);
