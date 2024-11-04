import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/models/reservation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }
  // addReservation(reservation: Reservation): Observable<Reservation> {
  //   return this.http.post<Reservation>(`${environment.baseUrl}/reservation/add-reservation`, reservation);
  // }

  removeReservation(reservationId: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/reservation/remove-reservation/${reservationId}`);
  }

  modifyReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${environment.baseUrl}/reservation/modify-reservation`, reservation);
  }
  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${environment.baseUrl}/reservation/retrieve-all-reservations`);
  }
  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${environment.baseUrl}/reservation/add-reservation`, reservation, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
