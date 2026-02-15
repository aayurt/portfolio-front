import GalleryView from "@/components/gallery/GalleryView";
import { baseURL, person } from "@/resources";
import { getGallery, getTenantBySlug } from "@/utils/payload";
import { Flex, Meta, Schema } from "@once-ui-system/core";

export async function generateMetadata() {
  const tenant = await getTenantBySlug();
  return Meta.generate({
    title: tenant?.name + " | Gallery",
    description: tenant?.name + "Collection | Gallery",
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(tenant?.name + " | Gallery")}`,
    path: "/gallery",
  });
}

export default async function Gallery() {
  const tenant = await getTenantBySlug();
  const galleries = await getGallery();
  return (
    <Flex maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={tenant?.name + " | Gallery"}
        description={tenant?.name + "Collection | Gallery"}
        path="/gallery"
        image={`/api/og/generate?title=${encodeURIComponent(tenant?.name + " | Gallery")}`}
        author={{
          name: person.name,
          url: `${baseURL}/gallery`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <GalleryView galleries={galleries} />
    </Flex>
  );
}
