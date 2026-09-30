export interface CompositionImage {
  src: string;
  alt?: string;
  badge?: string;
}

export type CompositionImageInput = string | CompositionImage;

export interface LayeredImageCompositionProps {
  /**
   * Array of 4 images for the composition:
   * [0] = Center Main Hero Frame
   * [1] = Bottom-Left Foreground Frame
   * [2] = Top-Right Secondary Frame
   * [3] = Bottom-Right Background Frame
   */
  images?: CompositionImageInput[];
  /** Center main hero card override */
  mainImage?: CompositionImageInput;
  /** Bottom-left foreground card override */
  bottomLeftImage?: CompositionImageInput;
  /** Top-right secondary card override */
  topRightImage?: CompositionImageInput;
  /** Bottom-right background card override */
  bottomRightImage?: CompositionImageInput;
  /** Faint watermark text displayed behind the composition */
  watermarkText?: string;
  /** Whether to render the blueprint grid lines behind the cards (default: true) */
  showGrid?: boolean;
  /** Whether to render the ambient warm glow behind the cards (default: true) */
  showGlow?: boolean;
  /** Enable subtle mouse parallax effect on the cards (default: true) */
  enableParallax?: boolean;
  /** Additional CSS class for the container */
  className?: string;
  /** Optional container element ID */
  id?: string;
  /** Inline style overrides */
  style?: React.CSSProperties;
}
