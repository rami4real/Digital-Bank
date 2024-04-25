import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css'] // Correct property name to 'styleUrls'
})
export class OperationComponent {
  constructor(
    public dialogRef: MatDialogRef<OperationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { account: Account }, // Inject the data
    private http: HttpClient // Inject HttpClient here
  ) { }

  async deposit(){
    const amontObject = document.getElementById('number-input') as HTMLInputElement | null;
    const index = this.data.account.id;
    const amount = Number(amontObject?.value) || 0;
    const url = "http://localhost:8080/api/operations/versement";
    const Headerss = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      "compteId" : index,
      "montant" : amount
    };

    try {
      const urlResponse: any = await this.http.post(url, body, { headers: Headerss }).toPromise();
      this.dialogRef.close();
    } catch (error) {
      console.error("Error occurred while making the HTTP request:", error);
    }
  }
}

interface Account {
  id: number;
  dateCreation: string;
  solde: number;
  etat: string;
  Operation: Operation[];
  decouvert: number;
  tauxInteret: number;
  type: string;
}

interface Operation {
  id: number;
  dateOperation: string;
  montant: number;
  type: string;
}
