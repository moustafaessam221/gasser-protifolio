export type Project = {
  id: string | number;
  title: string | undefined;
  short_description: string;
  long_description: string;
  featured_Images: string[];
  device: string;
  bg_img: string;
};

// carousel settings
export type FeaturedScreensProps = {
  featured_images: string[];
};

export type NavigationButtonProps = {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
};

export type CarouselImageProps = {
  src: string;
  alt: string;
  width: string;
  isActive?: boolean;
  onClick?: () => void;
  onLoad?: () => void;
};

export type DotsNavigationProps = {
  images: string[];
  currentIndex: number;
  onChange: (index: number) => void;
};

export type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
};
