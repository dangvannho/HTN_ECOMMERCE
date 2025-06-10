export interface BannerSlider {
  title: string;
  description: string;
  image: string;
  link: string;
  position: number;
}

export interface BannerSliderResponse {
  statusCode: number;
  message: string;
  data: BannerSlider[];
}
