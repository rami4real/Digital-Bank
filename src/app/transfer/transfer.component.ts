import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  constructor(
    public dialogRef: MatDialogRef<TransferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { account: Account },
    private http: HttpClient
  ) { }

  async transfer() {
    const amountInput = document.getElementById('number-input') as HTMLInputElement | null;
    const receiverInput = document.getElementById('receiver-input') as HTMLInputElement | null;
    const senderAccountId = this.data.account.id;
    const amount = Number(amountInput?.value) || 0;
    const receiverAccount = Number(receiverInput?.value) || '';
    const url = "http://localhost:8080/api/operations/virement";
    const Headerss = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      "compteSourceId": senderAccountId,
      "compteDestinataireId": receiverAccount,
      "montant": amount
    };

    try {
      console.log(senderAccountId)
      console.log(receiverAccount)

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
