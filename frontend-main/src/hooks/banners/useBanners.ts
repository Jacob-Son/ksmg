import { MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react';
import { useResponsive } from '../common/useResponsive';

export default function useBanners<T>({
  banners,
  animationSettings,
  isAutoSlide = true,
}: {
  banners: T[];
  animationSettings: {
    slideSpeed: number;
    animationSpeed: number;
    animationInterval: number;
  };
  isAutoSlide?: boolean;
}) {
  const { isMobile } = useResponsive();
  const [current, setCurrent] = useState(0);
  const [isTranslationActive, setIsTranslationActive] = useState(true);
  const [mouseX, setMouseX] = useState(0);
  const isMouseDown = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isPageMoved, setIsPageMoved] = useState(false);

  const isAnimationActiveRef = useRef(true);
  const throttledSetCurrent = (val: number) => {
    if (isAnimationActiveRef.current) {
      setCurrent(val);
      isAnimationActiveRef.current = false;

      setTimeout(() => {
        isAnimationActiveRef.current = true;
      }, animationSettings.animationSpeed);
    }
  };

  const onMoveStart = (posX: number) => {
    setMouseX(posX);
    isMouseDown.current = true;
    setTimeout(() => {
      isMouseDown.current && setIsDragging(true);
    }, 100);
    if (current === 0) {
      setIsTranslationActive(false);
      throttledSetCurrent(banners.length);
    }
  };
  const onMove = (posX: number) => {
    if (isPageMoved) return;
    let threshold = 50;
    if (isMobile) threshold = 25;
    if (posX - mouseX >= threshold) {
      const prev = current > 0 ? current - 1 : banners.length - 2;
      setIsTranslationActive(true);
      setIsPageMoved(true);
      throttledSetCurrent(prev);
    }
    if (posX - mouseX <= -1 * threshold) {
      setIsTranslationActive(true);
      setIsPageMoved(true);
      throttledSetCurrent(current + 1);
    }
  };
  const onMoveEnd = () => {
    setIsTranslationActive(true);
    isMouseDown.current = false;
    setIsDragging(false);
    setIsPageMoved(false);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    onMoveStart(e.touches[0].clientX);
  };
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    onMove(e.changedTouches[0].clientX);
  };
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onMoveStart(e.clientX);
  };
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    // 마우스 클릭한 상태(드래그)에서만 이벤트 호출
    if (isDragging) onMove(e.clientX);
  };

  useEffect(() => {
    if (!isAutoSlide) return;

    const invertal = setInterval(() => {
      if (current < banners.length) {
        throttledSetCurrent(current + 1);
      } else {
        throttledSetCurrent((current + 1) % banners.length);
      }
    }, animationSettings.animationInterval);

    return () => {
      clearInterval(invertal);
    };
  });

  // 현재 배너가 concat한 array의 1번째 배너일 경우, 첫번째 배너로 이동
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isDragging) return;
      setIsTranslationActive(current < banners.length);
      if (current >= banners.length) {
        setCurrent((prev) => prev % banners.length);
      }
    }, animationSettings.slideSpeed);

    return () => {
      clearTimeout(timeout);
    };
  }, [current, isDragging]);

  return {
    current,
    isDragging,
    isTranslationActive,
    throttledSetCurrent,
    handleTouchStart,
    handleTouchMove,
    onMoveEnd,
    handleMouseDown,
    handleMouseMove,
  };
}
