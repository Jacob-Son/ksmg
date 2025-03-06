import { io } from 'socket.io-client';
import { Bid } from '~/types/auction';

const serverUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

class AuctionSocket {
  handlers = new Set<(updateBid: Bid) => void>();

  constructor(auctionId: string) {
    const socket = io(`${serverUrl}/auctions`, {
      query: {
        auctionId,
      },
    });
    socket.on('updateBid', (updateBid) => {
      this.handlers.forEach((handler) => handler(updateBid));
    });
  }

  on(handler: (updateBid: Bid) => void) {
    this.handlers.add(handler);
  }

  off(handler: (updateBid: Bid) => void) {
    this.handlers.delete(handler);
  }
}

export default AuctionSocket;
