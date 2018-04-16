import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
    selector : "order",
    templateUrl : "./order.component.html"
})
export class OrderComponent implements OnInit{

    data: any;
    showorders: boolean;
    msg : string;

    constructor(private http : HttpClient, private router: Router,private cookieService:CookieService){

    }

    ngOnInit(){
        this.fetchData();
    }

    fetchData() {
        this.msg = "";
        const headers = new HttpHeaders().append('Content-Type', 'application/json;charset=UTF-8');
        let responsedata: any;
        headers.set('tokenid',this.cookieService.get('tokenid'));
        this.http.get("api/od/order/query/orderhistory", { headers }).subscribe(
            response => {
                responsedata = response;
            },
            error => {
                this.msg = "Enabled to connect";
            },
            () => {
                this.setData(responsedata);
            }
        );
    }

    setData(responsedata: any) {
        debugger;
        if (responsedata && responsedata.success) {
            this.showorders = true;
            this.data = responsedata.response;

        } else {
            this.showorders = false;
            this.msg = responsedata.message;


        }
    }
}
