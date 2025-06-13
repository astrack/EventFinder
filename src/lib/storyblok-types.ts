import { SbBlokData } from "@storyblok/react/rsc";

export interface EventCardBlok extends SbBlokData {
  image: { filename: string };
  title: string;
  start: string;
  venue: string;
  summary?: string;
  tags?: string[];
  price?: string;
}

export type NavbarBlok = SbBlokData;

export interface FiltersDrawerBlok extends SbBlokData {
  categories?: string[];
  price_min?: number;
  price_max?: number;
}

export interface GridBlok extends SbBlokData {
  columns?: SbBlokData[];
}

export interface PageBlok extends SbBlokData {
  body?: SbBlokData[];
}

export interface TeaserBlok extends SbBlokData {
  headline: string;
}

export interface FeatureBlok extends SbBlokData {
  name: string;
}
