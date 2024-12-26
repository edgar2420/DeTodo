import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;
  private socketUrl = 'http://24.199.117.47';

  connect(tripId: number): Socket {
    if (!this.socket) {
      this.socket = io(this.socketUrl, {
        query: { tripId }
      });
    }
    return this.socket;
  }

  emitEvent(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  listenToEvent(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
