import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ListComponent } from '../list/list.component';
import { ListcomptesComponent } from '../listcomptes/listcomptes.component';
import { ListtransactionsComponent } from '../listtransactions/listtransactions.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  numberOfAccounts: Promise<number> | undefined;
  numberOfTransactions: Promise<number> | undefined;
  numberOfComptes: Promise<number> | undefined;
  constructor(private router: Router, private http: HttpClient,public dialog: MatDialog) { }
  list(){
      const dialogRef = this.dialog.open(ListComponent, );
  
      dialogRef.afterClosed().subscribe(result => {
        
        console.log('The dialog was closed');
        
      });
     
  
}



Operationscomptes(){
  const dialogRef = this.dialog.open(ListcomptesComponent, );

  dialogRef.afterClosed().subscribe(result => {
    
    console.log('The dialog was closed');
    
  });

}
Operationstransactions(){
  const dialogRef = this.dialog.open(ListtransactionsComponent, );

  dialogRef.afterClosed().subscribe(result => {
    
    console.log('The dialog was closed');
    
  });

}
ngOnInit() {

   this.numberOfAccounts=this.calculateNumberOfAccounts();
   this.numberOfTransactions=this.calculateNumberOfTransactions();
   this.numberOfComptes=this.calculateNumberOfComptes();
   // Call the method to fetch the emails when the component initializes
}


  async calculateNumberOfAccounts(): Promise<number> {
  // Fetch all client emails from the API
  const clientsInfo = 'http://' + window.location.hostname + ':8080/api/clients';
  const response: any = await this.http.get(clientsInfo).toPromise();
  
  const allClients = response; // Assign the response to the array


  return allClients.length; // Calculate and return the number of accounts
}
async calculateNumberOfTransactions(): Promise<number> {
  // Fetch all client emails from the API
  const TransactionsInfo = 'http://' + window.location.hostname + ':8080/api/operations';
  const response: any = await this.http.get(TransactionsInfo).toPromise();
  
  const allTransactions = response; // Assign the response to the array


  return allTransactions.length; // Calculate and return the number of accounts
}
async calculateNumberOfComptes(): Promise<number> {
  // Fetch all client emails from the API
  const Comptes = 'http://' + window.location.hostname + ':8080/api/comptes';
  const response: any = await this.http.get(Comptes).toPromise();
  
  const allComptes = response; // Assign the response to the array


  return allComptes.length; // Calculate and return the number of accounts
}
}