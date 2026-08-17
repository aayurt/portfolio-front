"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Column, IconButton, Row } from "@once-ui-system/core";
import styles from "./SnapCarousel.module.scss";

type SnapCarouselProps = {
  children: React.ReactNode;
  ariaLabel?: string;
};

export const SnapCarousel: React.FC<SnapCarouselProps> = ({ children, ariaLabel }) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
    setProgress(max > 0 ? Math.min(100, (el.scrollLeft / max) * 100) : 0);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = viewportRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const cards = React.Children.toArray(children);

  if (cards.length === 0) {
    return null;
  }

  return (
    <Column gap="12" fillWidth>
      <Row fillWidth horizontal="end" gap="4">
        <IconButton
          size="s"
          variant="secondary"
          icon="chevronLeft"
          aria-label="Previous"
          disabled={!canPrev}
          onClick={() => scrollByCard(-1)}
        />
        <IconButton
          size="s"
          variant="secondary"
          icon="chevronRight"
          aria-label="Next"
          disabled={!canNext}
          onClick={() => scrollByCard(1)}
        />
      </Row>

      <div ref={viewportRef} className={styles.viewport} role="region" aria-label={ariaLabel}>
        {cards.map((card, index) => (
          <div key={index} className={styles.card}>
            {card}
          </div>
        ))}
      </div>

      <Row fillWidth radius="full" background="neutral-alpha-weak" height="2" overflow="hidden">
        <Row
          fillWidth
          height="2"
          radius="full"
          solid="brand-strong"
          style={{ width: `${progress}%`, transition: "width 0.2s ease" }}
        />
      </Row>
    </Column>
  );
};
