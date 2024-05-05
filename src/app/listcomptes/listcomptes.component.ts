
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-listcomptes',
  templateUrl: './listcomptes.component.html',
  styleUrl: './listcomptes.component.css'
})
export class ListcomptesComponent {
  allcomptes: any[] = []; // Array to hold the list of clients

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    this.listemails(); // Call the method to fetch the emails when the component initializes
  }

  async listemails() {
    try {
      // Fetch all client emails from the API
      const comptes = 'http://' + window.location.hostname + ':8080/api/comptes';
      const response: any = await this.http.get(comptes).toPromise();
      
      this.allcomptes = response; // Assign the response to the array

      console.log(this.allcomptes);
    } catch (error) {
      console.error('Error fetching client emails:', error);
      // Handle error accordingly, you may want to display an error message to the user
    }
  }
}
// list.component.ts



