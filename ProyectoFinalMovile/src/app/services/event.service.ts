import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private tripEndedSubject = new Subject<void>();

  tripEnded$ = this.tripEndedSubject.asObservable();

  emitTripEnded() {
    this.tripEndedSubject.next();
  }
}
