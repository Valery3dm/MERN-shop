import { Product } from "../../interfaces";

export type ReviewsSectionProps = {
  product: Product;
  productId?: string;
  refetch: () => void;
};
