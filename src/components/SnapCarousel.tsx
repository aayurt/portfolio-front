"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Column, IconButton, Row } from "@once-ui-system/core";
import styles from "./SnapCarousel.module.scss";

const GAP = 16;

type SnapCarouselProps = {
  children: React.ReactNode;
  ariaLabel?: string;
};

export const SnapCarousel: React.FC<SnapCarouselProps> = ({ children, ariaLabel }) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  const cards = React.Children.toArray(children);

  const update = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth + GAP;
    const max = el.scrollWidth - el.clientWidth;
    const perView = Math.max(1, Math.round((el.clientWidth + GAP) / step));
    const firstVisible = Math.round(el.scrollLeft / step);
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
    setProgress(max > 0 ? Math.min(100, (el.scrollLeft / max) * 100) : 0);
    setPages(Math.max(1, Math.ceil(cards.length / perView)));
    setPage(Math.min(Math.max(0, Math.floor(firstVisible / perView)), Math.max(0, Math.ceil(cards.length / perView) - 1)));
  }, [cards.length]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = viewportRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + GAP : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const goToPage = (index: number) => {
    const el = viewportRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + GAP : el.clientWidth * 0.8;
    const perView = Math.max(1, Math.round((el.clientWidth + GAP) / step));
    el.scrollTo({ left: index * perView * step, behavior: "smooth" });
  };

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

      <div
        ref={viewportRef}
        className={styles.viewport}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollByCard(-1);
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollByCard(1);
          }
        }}
      >
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

      {pages > 1 && (
        <Row fillWidth horizontal="center" gap="8" wrap>
          {Array.from({ length: pages }, (_, index) => (
            <button
              key={index}
              type="button"
              className={index === page ? `${styles.dot} ${styles.dotActive}` : styles.dot}
              aria-label={`Go to page ${index + 1} of ${pages}`}
              aria-current={index === page}
              onClick={() => goToPage(index)}
            />
          ))}
        </Row>
      )}
    </Column>
  );
};
