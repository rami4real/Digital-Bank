// list.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  allClients: any[] = []; // Array to hold the list of clients

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    this.listemails(); // Call the method to fetch the emails when the component initializes
  }

  async listemails() {
    try {
      // Fetch all client emails from the API
      const clients = 'http://' + window.location.hostname + ':8080/api/clients';
      const response: any = await this.http.get(clients).toPromise();
      
      this.allClients = response; // Assign the response to the array

      console.log(this.allClients);
    } catch (error) {
      console.error('Error fetching client emails:', error);
      // Handle error accordingly, you may want to display an error message to the user
    }
  }
}
