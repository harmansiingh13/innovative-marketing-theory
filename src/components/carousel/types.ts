export interface CarouselItem {
  id: string;
  image: string;
  eyebrow?: string;
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  link?: string;
  linkText?: string;
  imageAlt?: string;
}

export interface ReusableCarouselProps {
  items: CarouselItem[];
  autoplay?: boolean;
  autoplayInterval?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  showCounter?: boolean;
  pauseOnHover?: boolean;
  animateOnScroll?: boolean;
  className?: string;
  onSlideChange?: (index: number, item: CarouselItem) => void;
}
