export type AuctionPost = {
  startDate: Date;
  endDate: Date;
  artId: number;
};

export type AuctionGet = {
  id: number;
  startDate: Date;
  endDate: Date;
  artId: number;
  status: string;
  createdDate: Date;
};
