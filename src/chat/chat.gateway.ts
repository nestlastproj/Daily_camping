// import {
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
//   WsResponse,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { ChatService } from './chat.service';
// import { setInitDTO, chatRoomListDTO } from './dto/chat.dto';
// import { Observable, map, from } from 'rxjs';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from 'src/entity/user.entity';
// import { Repository } from 'typeorm';

// @WebSocketGateway(4000, {
//   cors: {
//     origin: 'http://localhost:3000',
//   },
// })
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   constructor(
//     private readonly chatService: ChatService,
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {}

//   @WebSocketServer() // 현재 동작중인 웹소켓서버 객체
//   server: Server;

//   //oo소켓 연결시 유저목록에 추가
//   public handleConnection(client: Socket): void {
//     console.log('connected', client.id);
//     client.leave(client.id);
//     client.data.roomId = `room:lobby`;
//     client.join('room:lobby');
//   }

//   //소켓 연결 해제시 유저목록에서 제거
//   public handleDisconnect(client: Socket): void {
//     const { roomId } = client.data;
//     if (roomId != 'room:lobby' && !this.server.sockets.adapter.rooms.get(roomId)) {
//       this.chatService.deleteChatRoom(roomId);
//       this.server.emit('getChatRoomList', this.chatService.getChatRoomList());
//     }
//     console.log('disonnected', client.id);
//   }

//   //oo메시지가 전송되면 모든 유저에게 메시지 전송
//   @SubscribeMessage('sendMessage') // localhost:3000/auth/chat/sendMessage
//   //client 변수는 메시지를 보낸 웹소켓 객체를 반환, message는 전송한 메시지
//   sendMessage(client: Socket, message: string): void {
//     client.rooms.forEach((roomId) =>
//       client.to(roomId).emit('getMessage', {
//         id: client.id,
//         nickname: client.data.nickname,
//         message,
//       }),
//     );
//   }

//   //xx처음 접속시 닉네임 등 최초 설정
//   @SubscribeMessage('setInit')
//   setInit(client: Socket, data: setInitDTO): setInitDTO {
//     // 이미 최초 세팅이 되어있는 경우 패스
//     if (client.data.isInit) {
//       return;
//     }

//     client.data.nickname = client.id;

//     client.data.isInit = true;

//     return {
//       nickname: client.data.nickname,
//       room: {
//         roomId: 'room:lobby',
//         roomName: '로비',
//       },
//     };
//   }

//   // xx닉네임 변경
//   // @SubscribeMessage('setNickname')
//   // setNickname(client: Socket, nickname: string): void {
//   //   const { roomId } = client.data;
//   //   client.to(roomId).emit('getMessage', {
//   //     id: null,
//   //     nickname: '안내',
//   //     message: `"${client.data.nickname}"님이 "${nickname}"으로 닉네임을 변경하셨습니다.`,
//   //   });
//   //   client.data.nickname = nickname;
//   // }

//   //채팅방 목록 가져오기
//   @SubscribeMessage('getChatRoomList')
//   getChatRoomList(client: Socket, payload: any) {
//     client.emit('getChatRoomList', this.chatService.getChatRoomList());
//   }

//   //채팅방 생성하기
//   @SubscribeMessage('createChatRoom')
//   createChatRoom(client: Socket, roomName: string, id: number) {
//     //이전 방이 만약 나 혼자있던 방이면 제거
//     if (client.data.roomId != 'room:lobby' && this.server.sockets.adapter.rooms.get(client.data.roomId).size == 1) {
//       this.chatService.deleteChatRoom(client.data.roomId);
//     }

//     this.chatService.createChatRoom(client, roomName, id);
//     return {
//       roomId: client.data.roomId,
//       roomName: this.chatService.getChatRoom(client.data.roomId).roomName,
//     };
//   }

//   //oo채팅방 들어가기
//   @SubscribeMessage('enterChatRoom')
//   enterChatRoom(client: Socket, roomId: string) {
//     //이미 접속해있는 방 일 경우 재접속 차단
//     if (client.rooms.has(roomId)) {
//       return;
//     }
//     //이전 방이 만약 나 혼자있던 방이면 제거
//     if (client.data.roomId != 'room:lobby' && this.server.sockets.adapter.rooms.get(client.data.roomId).size == 1) {
//       this.chatService.deleteChatRoom(client.data.roomId);
//     }
//     this.chatService.enterChatRoom(client, roomId);
//     return {
//       roomId: roomId,
//       roomName: this.chatService.getChatRoom(roomId).roomName,
//     };
//   }
// }
