export interface Currency {
  name: string;
  ticker: string;
  network: string;
  memo: boolean;
  image: string;
  minimum: number;
  maximum: number;
  popular?: boolean;
}
