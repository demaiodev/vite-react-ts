export type MovieReview = {
  id: number;
  createdDate?: string;
  title?: string;
  personalRating?: number;
  personalReview?: string;
  reccBy?: string;
  imdbId: string;
  imageUrl?: string;
  runtime: number;
  finished: boolean;
};
