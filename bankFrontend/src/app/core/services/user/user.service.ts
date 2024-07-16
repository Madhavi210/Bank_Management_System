import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/interface/user.interface';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `http://localhost:3000/api/user`;

  constructor(private http: HttpClient) {}

  createUser(formData: any): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}`, formData);
  }

  getUserById(userId: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${userId}`);
  }

  getAllUsers(): Observable<{ users: IUser[]; totalUser: number }> {
    return this.http.get<{ users: IUser[]; totalUser: number }>(this.apiUrl);
  }

  updateUser(id: string, formData: FormData): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/${id}`, formData);
  }

  deleteUser(userId: string): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        console.error('Error deleting user:', error);
        throw error; 
      })
    );
  }
}
