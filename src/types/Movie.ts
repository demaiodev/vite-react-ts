export type Movie = {
  id: string;
  originalTitle: string;
  primaryTitle: string;
  startYear?: number;
  type?: string;
  runtimeSeconds?: number;
  primaryImage?: {
    height?: number;
    url?: string;
    width?: number;
  };
  rating?: {
    aggregateRating?: number;
    voteCount?: number;
  };
};
