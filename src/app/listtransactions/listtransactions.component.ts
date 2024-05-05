
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listtransactions',
  templateUrl: './listtransactions.component.html',
  styleUrl: './listtransactions.component.css'
})
export class ListtransactionsComponent {
  alltransactions: any[] = []; // Array to hold the list of clients

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    this.listtransactions(); // Call the method to fetch the emails when the component initializes
  }

  async listtransactions() {
    try {
      // Fetch all client emails from the API
      const transactions = 'http://' + window.location.hostname + ':8080/api/operations';
      const response: any = await this.http.get(transactions).toPromise();
      
      this.alltransactions = response; // Assign the response to the array

      console.log(this.alltransactions);
    } catch (error) {
      console.error('Error fetching client emails:', error);
      // Handle error accordingly, you may want to display an error message to the user
    }
  }
}
// list.component.ts



