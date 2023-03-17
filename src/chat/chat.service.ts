// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Socket } from 'socket.io';
// import { User } from 'src/entity/user.entity';
// import { Repository } from 'typeorm';
// import { v4 as uuidv4 } from 'uuid';
// import { chatRoomListDTO } from './dto/chat.dto';

// @Injectable()
// export class ChatService {
//   private chatRoomList: Record<string, chatRoomListDTO>;
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {
//     this.chatRoomList = {
//       'room:lobby': {
//         roomId: 'room:lobby',
//         roomName: '로비',
//         cheifId: null,
//       },
//     };
//   }
//   createChatRoom(client: Socket, roomName: string, id: number): void {
//     const roomId = `room:${uuidv4()}`;
//     const nickname = this.userRepository.findOneBy({ id });
//     this.chatRoomList[roomId] = {
//       roomId,
//       cheifId: client.id,
//       roomName,
//     };
//     client.data.roomId = roomId;
//     client.rooms.clear();
//     client.join(roomId);
//     client.emit('getMessage', {
//       id: null,
//       nickname: '안내',
//       message: '"' + nickname + '"님이 "' + roomName + '"방을 생성하였습니다.',
//     });
//   }

//   enterChatRoom(client: Socket, roomId: string) {
//     client.data.roomId = roomId;
//     client.rooms.clear();
//     client.join(roomId);
//     const { nickname } = client.data;
//     const { roomName } = this.getChatRoom(roomId);
//     client.to(roomId).emit('getMessage', {
//       id: null,
//       nickname: '안내',
//       message: `"${nickname}"님이 "${roomName}"방에 접속하셨습니다.`,
//     });
//   }

//   exitChatRoom(client: Socket, roomId: string) {
//     client.data.roomId = `room:lobby`;
//     client.rooms.clear();
//     client.join(`room:lobby`);
//     const { nickname } = client.data;
//     client.to(roomId).emit('getMessage', {
//       id: null,
//       nickname: '안내',
//       message: '"' + nickname + '"님이 방에서 나갔습니다.',
//     });
//   }

//   getChatRoom(roomId: string): chatRoomListDTO {
//     return this.chatRoomList[roomId];
//   }

//   getChatRoomList(): Record<string, chatRoomListDTO> {
//     return this.chatRoomList;
//   }

//   deleteChatRoom(roomId: string) {
//     delete this.chatRoomList[roomId];
//   }
// }
