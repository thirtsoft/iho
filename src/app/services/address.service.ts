import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  public apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllAddresss(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiServerUrl}/addresses/all`);
  }

  public getAllAddresssOrderByIdDesc(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiServerUrl}/addresses/searchAllAddressOrderByIdDesc`);
  }

  public getAddressById(addId: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiServerUrl}/addresses/findById/${addId}`);
  }

  public addAddress(add: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiServerUrl}/addresses/create`, add);
  }

  public updateAddress(addId: number, add: Address): Observable<Address> {
    return this.http.put<Address>(`${this.apiServerUrl}/addresses/update/${addId}`, add);
  }

  public deleteAddress(addId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/addresses/delete/${addId}`);
  }
  
}
