import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Buraco } from 'src/app/interfaces/buraco';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:8000/api/buraco";

@Injectable({
  providedIn: 'root'
})
export class BuracoService {

  constructor(private http: HttpClient) { }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProduct(id): Observable<Buraco> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Buraco>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Buraco>(`getProduct id=${id}`))
    );
  }
  
  addProduct (product): Observable<Buraco> {
    return this.http.post<Buraco>(apiUrl, product, httpOptions).pipe(
      tap(),
      catchError(this.handleError<Buraco>('addProduct'))
    );
  }
  
  updateProduct (id, product): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }
  
  deleteProduct (id): Observable<Buraco> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Buraco>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Buraco>('deleteProduct'))
    );
  }
}
