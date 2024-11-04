import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bloc } from 'src/app/models/bloc';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlocService {

  constructor(private http: HttpClient) { }
  getBlocs(): Observable<Bloc[]> {
    return this.http.get<Bloc[]>(`${environment.baseUrl}/bloc/retrieve-all-blocs`);
  }

  // Ajouter un bloc
  addBloc(bloc: Bloc): Observable<Bloc> {
    return this.http.post<Bloc>(`${environment.baseUrl}/bloc/add-bloc`, bloc);
  }

  // Supprimer un bloc
  removeBloc(blocId: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/bloc/remove-bloc/${blocId}`);
  }

  modifyBloc(bloc: Bloc): Observable<Bloc> {
    return this.http.put<Bloc>(`${environment.baseUrl}/bloc/modify-bloc`, bloc);
  }
}
