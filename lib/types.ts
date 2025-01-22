export type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
    description: { icon: string; text: string }[];
  };
  
  export type CartItem = Product & {
    quantity: number;
  };

export interface IRequest {
    uniqueId:string,
    seatId:string
  }