import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient} from "@angular/common/http";
import { AuthenticationService } from "../authentication/authentication.service";

@Injectable()
export class MovieHttpClient{

    constructor(private http: HttpClient,private authsvc:AuthenticationService){}

    createHeaders() : HttpHeaders {
        let headers = new HttpHeaders();
        headers =  headers.append('Authorization', 'Bearer ' +
      this.authsvc.getToken());
      headers = headers.append('Content-Type','application/json');
      headers = headers.append('Accept','application/json' );
      headers = headers.append('userId',this.authsvc.getUserId());
      return headers;
        }

    get<T>(url){
       let headers =  this.createHeaders();
       return this.http.get<T>(url,{
           headers: headers
         });
        }

    post<T>(url, data){
        let headers =  this.createHeaders();
        return this.http.post<T>(url,data,{
                headers: headers
              });
    }   

    put(url, data){
        let headers =  this.createHeaders();
        return this.http.put(url,data,{
                headers: headers
              });
    } 

    delete(url){
        let headers =  this.createHeaders();
        return this.http.delete(url,{
            headers: headers
          });
         }
}