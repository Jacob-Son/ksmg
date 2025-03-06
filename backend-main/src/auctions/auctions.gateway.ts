import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Bid } from '@prisma/client';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(6000, {
  namespace: 'auctions',
  cors: {
    origin: '*',
  },
})
export class AuctionsGateway {
  @WebSocketServer()
  server: Server;

  updateBid(auctionId: string, bid: Bid): void {
    this.server.to(auctionId.toString()).emit('updateBid', bid);
  }

  handleConnection(client: Socket) {
    const auctionId = client.handshake.query.auctionId;
    if (auctionId) {
      if (client.rooms[auctionId.toString()]) {
        return;
      }
      client.join(auctionId.toString());
    }
  }

  handleDisconnect(client: Socket) {
    const auctionId = client.handshake.query.auctionId;
    if (auctionId) {
      client.leave(auctionId.toString());
    }
  }
}
