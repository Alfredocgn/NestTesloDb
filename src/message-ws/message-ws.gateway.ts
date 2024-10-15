import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessageWsService } from './message-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces';

@WebSocketGateway({cors:true,namespace:'/'})
export class MessageWsGateway  implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss:Server;

  constructor(
    private readonly messageWsService: MessageWsService,
    private readonly jwtService : JwtService,

  ) {}

  async handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.headers.authentication as string;
    let payload : JwtPayload;
    try{

      payload = this.jwtService.verify(token)
      await this.messageWsService.registerClient(client,payload.id)


    }catch(error){
      client.disconnect();
      return;
    }
    
/*     console.log('Cliente conectado:',client.id) */
    
    this.wss.emit('clients-updated',this.messageWsService.getConnectedClients())
    
  }

  handleDisconnect(client: Socket) {
/*     console.log('Cliente desconectado', client.id) */

    this.messageWsService.removeClient(client.id)
    this.wss.emit('clients-updated',this.messageWsService.getConnectedClients())
    
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client:Socket,payload:NewMessageDto){

    //Univamente al cliente
    
/*     client.emit('message-from-server',{
      fullName:'Soy yo',
      message:payload.message || 'no-message'
  }) */

      //Todos menos al cliente inciial
/*     client.broadcast.emit('message-from-server',{
      fullName:'Soy yo',
      message:payload.message || 'no-message'
  })
 */
  this.wss.emit('message-from-server',{
      fullName:this.messageWsService.getUserFullNameBySocketId(client.id),
      message:payload.message || 'no-message'
  })


  }

}
