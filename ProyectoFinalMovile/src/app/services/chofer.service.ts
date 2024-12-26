import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChoferService {
  private loginUrl = 'http://143.198.16.180/api/auth/logindriver';
  private registerUrl = 'http://143.198.16.180/api/auth/registerdriver';
  private tripsUrl = 'http://143.198.16.180/api/trips';
  private driverInfoUrl = 'http://143.198.16.180/api/auth/me';
  private socketUrl = 'http://24.199.117.47';
  private socket: Socket | undefined;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

    const body = { email, password };

    return this.http.post<any>(this.loginUrl, body, { headers });
  }

  registro(fullname: string, email: string, password: string, vehicle_brand: string, vehicle_model: string, vehicle_color: string, vehicle_plate: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

    const body = {
      fullname,
      email,
      password,
      vehicle_brand,
      vehicle_model,
      vehicle_color,
      vehicle_plate
    };

    return this.http.post<any>(this.registerUrl, body, { headers });
  }

  createTrip(tripData: any): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('Token no disponible'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.tripsUrl, tripData, { headers });
  }

  getTrips(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('Token no disponible'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.tripsUrl, { headers });
  }

  startTrip(tripId: number): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('Token no disponible'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.tripsUrl}/${tripId}/start`, {}, { headers });
  }

  getTripDetails(tripId: number): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('Token no disponible'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.tripsUrl}/${tripId}`, { headers });
  }

  getDriverInfo(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('Token no disponible'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.driverInfoUrl, { headers });
  }

  connectToSocket(tripId: number): Socket {
    if (!this.socket) {
      this.socket = io(this.socketUrl, {
        query: { tripId }
      });
    }
    return this.socket;
  }

  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }
}
