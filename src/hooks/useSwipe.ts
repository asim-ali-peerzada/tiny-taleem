import { type TouchEvent, useState } from "react";

interface SwipeInput {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export const useSwipe = ({ onSwipeLeft, onSwipeRight }: SwipeInput) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Min distance for swipe to be detected
  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(10);
      onSwipeLeft();
    } else if (isRightSwipe) {
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(10);
      onSwipeRight();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};
