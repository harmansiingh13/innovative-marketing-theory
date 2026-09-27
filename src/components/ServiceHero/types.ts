export interface ServiceHeroImage {
  src: string;
  alt: string;
  badge?: string;
}

export interface ReusableServiceHeroProps {
  eyebrow: string;
  titleLine1: string;
  titleLine2Prefix?: string;
  titleHighlight: string;
  titleLine2Suffix?: string;
  description: string;
  watermarkText?: string;
  images: ServiceHeroImage[];
  primaryCtaText?: string;
  primaryCtaTargetId?: string;
  onPrimaryCtaClick?: () => void;
  secondaryCtaText?: string;
  secondaryCtaTargetId?: string;
  onSecondaryCtaClick?: () => void;
  className?: string;
}
