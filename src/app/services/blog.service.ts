import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiServerUrl}/blogs/all`);
  }

  public getAllBlogsOrderByIdDesc(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiServerUrl}/blogs/searchAllBlogOrderByIdDesc`);
  }

  public getBlogById(addId: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiServerUrl}/blogs/findById/${addId}`);
  }

  public addBlog(add: Blog): Observable<Blog> {
    return this.http.post<Blog>(`${this.apiServerUrl}/blogs/create`, add);
  }

  public updateBlog(addId: number, add: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiServerUrl}/blogs/update/${addId}`, add);
  }

  public deleteBlog(addId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/blogs/delete/${addId}`);
  }
  
}
