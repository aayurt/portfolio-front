import React from "react";
import { SnapCarousel } from "../SnapCarousel";
import Post from "./Post";
import type { Post as PostType, Tenant } from "../../../payload-types";

type PostCarouselProps = {
  posts: PostType[];
  tenant: Tenant | null;
};

export const PostCarousel: React.FC<PostCarouselProps> = ({ posts, tenant }) => (
  <SnapCarousel ariaLabel="Latest posts carousel">
    {posts.map((post) => (
      <Post key={post.slug} post={post} thumbnail tenant={tenant} direction="column" />
    ))}
  </SnapCarousel>
);
