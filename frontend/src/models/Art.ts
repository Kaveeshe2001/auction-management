export type ArtPost = {
  Title: string;
  Image: string;
  CurrentMarketPrice: number;
  Condition: string;
  isFramed: boolean;
  Height: number;
  Width: number;
  StyleId: number;
  MediumId: number;
};

export type Art = {
  id: number;
  lot: string;
  title: string;
  image: string;
  currentMarketPrice: number;
  condition: string;
  isFramed: boolean;
  height: number;
  width: number;
  categoryId: number;
  createdBy: number;
};

export type ArtGet = {
  arts: Art[];
  totalCount: number;
};
