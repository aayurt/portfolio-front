"use client";

import { getImageUrl } from "@/utils/payload";
import { MasonryGrid, Media, Text } from "@once-ui-system/core";
import { Gallery } from "../../../payload-types";

export default function GalleryView({ galleries = [] }: { galleries: Gallery[] }) {
  return (
    <MasonryGrid columns={2} s={{ columns: 1 }}>
      {galleries.map((gallery, index) => {
        if (galleries.length === 0) {
          return <Text>No Images</Text>
        }
        return gallery.images?.map((image) => {
          return <Media
            enlarge
            priority={index < 10}
            sizes="(max-width: 560px) 100vw, 50vw"
            key={index}
            radius="m"
            src={getImageUrl(image.image)}
            alt={`${gallery.title} ${index}`}
          />
        })

      }
      )}
    </MasonryGrid>
  );
}
