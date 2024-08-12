import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rating } from '../models/rating';
import { TokenStorageService } from './auht/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  public apiServerUrl = environment.apiBaseUrl;

  id: any;
  artId: any;

  constructor(private http: HttpClient,
              private tokenService: TokenStorageService) {
  }

  /*********************** Rating *****************/
  public getRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiServerUrl}/ratings/all`);
  }

  public getTop3RatingOrderByCreatedDateDesc(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiServerUrl}/ratings/searchTop3RatingOrderByCreatedDateDesc`);
  }

  public getTop4RatingByChauffeurIdOrderByCreatedDateDesc(chauffId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiServerUrl}/ratings/searchTop4RatingOrderByCreatedDateDescByChauffeurId/${chauffId}`);
  }

  public getRatingById(noteId: number): Observable<Rating> {
    return this.http.get<Rating>(`${this.apiServerUrl}/ratings/findById/${noteId}`);
  }

  public addRating(rat: Rating): Observable<Rating> {
    return this.http.post<Rating>(`${this.apiServerUrl}/ratings/create`, rat);
  }

  public addRatingToDriver(id: number, rat: Rating): Observable<Rating> {
    return this.http.post<Rating>(`${this.apiServerUrl}/ratings/createWithChauffeur/${id}`, rat);
  }

  public addRatingToChauffeur(notificationDTO: Rating, idChauff: number, id:number): Observable<Rating> {
    return this.http.post<Rating>(`${this.apiServerUrl}/ratings/createRatingToChauffeur?idChauff=${idChauff}&id=${id}`, notificationDTO);
  }

  public updateRating(noteId: number, rat: Rating): Observable<Rating> {
    return this.http.put<Rating>(`${this.apiServerUrl}/ratings/update/${noteId}`, rat);
  }

  public deleteRating(noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/ratings/delete/${noteId}`);
  }

  public getUserId() {
    const user = this.tokenService.getUser();
    this.id = user.id
  }
}
