import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { OperationComponent } from '../operation/operation.component';
import { MatDialog } from '@angular/material/dialog';
import { WithdrawComponent } from '../withdraw/withdraw.component';
import { TransferComponent } from '../transfer/transfer.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent   {
  showDeleteConfirmation = false;  
  constructor(private route: ActivatedRoute,private http: HttpClient,private router: Router,public dialog: MatDialog) { }
  email: string = ''; // Déclaration de la propriété email
  Accounts: Account[] = []
  user: User | null = null;  

  ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      this.email = params['email'];
      
      
      this.getIdCompte().then(() => {
        // getUsers() a terminé avec succès, on peut appeler getAccounts()
        this.getAccounts();
    }).catch(error => {
        // Gérer les erreurs éventuelles de getUsers()
        console.error('Une erreur s\'est produite:', error);
        // Si vous voulez rediriger ou rafraîchir le jeton en cas d'erreur
        
    });
});
  
  }
 

  IdResponse(IdResponse: any) {
    throw new Error('Method not implemented.');
  }
  isMenuOpened: boolean = false;

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickedOutside(): void {
    this.isMenuOpened = false;
  }
  formatDateISO(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();

    // Pad the month and day with leading zeros if necessary
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }
  formattedDate : String ="";
  ID : number = 0
  name : String ="";
  async getIdCompte(){
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight
    this.formattedDate = this.formatDateISO(today);
    const getID = 'http://'+ window.location.hostname + ':8080/api/clients/'+this.email
    const IdResponse: any = await this.http.get(getID).toPromise();
    this.ID = IdResponse.id
    this.name=IdResponse.nom
    console.log(IdResponse.nom)
     this.user = {
      id: this.ID,  // ID de l'utilisateur
      firstname: IdResponse.prenom, // Prénom de l'utilisateur
      lastname: IdResponse.nom, // Nom de l'utilisateur
      email: IdResponse.email // Email de l'utilisateur
  };
  

  
  }
 
  
  async getAccounts() {
    const comptesUrl = 'http://' + window.location.hostname + ':8080/api/clients/' + this.user?.id + '/comptes';
    const userResponse: any = await this.http.get(comptesUrl).toPromise();
    this.Accounts = userResponse.map((account: { decouvert: any; tauxInteret: any; type: string; }) => {
      // Assuming decouvert and tauxInteret are directly on the account object
      if (account.decouvert && !account.tauxInteret) {
        account.type = 'Compte Courant';  // Account with overdraft and no interest rate
      } else if (!account.decouvert && account.tauxInteret) {
        account.type = 'Compte Épargne';  // Savings account with interest rate and no overdraft
      } else {
        // If neither condition is met, or data is missing, assign a default or handle error
        account.type = 'Unknown Type';  // Default or error handling case
      }
      return account;
    });
    console.log(this.Accounts)
  }
// Define the Accounts array and the confirmDelete function


 confirmDelete(accountId: number) {
  const confirmation = confirm("Are you sure you want to delete this account?");

    
  if (confirmation) {
      // Find the index of the account with the given accountId
      const index = this.Accounts.findIndex(account => account.id === accountId);
      console.log(index)

      if (index !== -1) {
          // Remove the account from the Accounts array
          const deletionurl = "http://localhost:8080/api/comptes/"+accountId
          console.log(index)
          const userResponse: any = this.http.delete(deletionurl).toPromise();;

    this.showDeleteConfirmation = false;
          // You can also add additional logic here, such as making an API call to delete the account from the server
          console.log("Account deleted successfully!");
          window.location.reload();

      } else {
          console.error("Account not found!");
      }
  }
}


  async accCourant() {
    this.getIdCompte()
    const Headerss = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      "dateCreation": this.formattedDate,
      "solde": 0.00,
      "etat": "ACTIVE",

      "client": {
        "id": this.ID // Assuming there is already a client with ID 1
      },
      "decouvert": 5.5
    }
    const comptesUrl = 'http://' + window.location.hostname + ':8080/api/comptes/sauvegarder-compte-courant';
    const userResponse: any = await this.http.post(comptesUrl ,body , {headers : Headerss}).toPromise().then(() => {
      this.getAccounts();
    });
    
  }
   out()
  {
    this.router.navigate(['/'])  ;
  }
  async accEpargne() {
    this.getIdCompte()
    const Headerss = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      "dateCreation": this.formattedDate,
      "solde": 0.00,
      "etat": "ACTIVE",

      "client": {
        "id": this.ID // Assuming there is already a client with ID 1
      },
      "tauxInteret": 2
    }
    const comptesUrl = 'http://' + window.location.hostname + ':8080/api/comptes/sauvegarder-compte-epargne';
    const userResponse: any = await this.http.post(comptesUrl ,body , {headers : Headerss}).toPromise().then(() => {
      this.getAccounts();
    });
    
  }
  deposit(account: Account): void {
    const dialogRef = this.dialog.open(OperationComponent, {
      data: { account: account } // Pass the account as data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      
      console.log('The dialog was closed');
      window.location.reload();

    });
  }
  withdraw(account: Account): void {
    const dialogRef = this.dialog.open(WithdrawComponent, {
      data: { account: account } // Pass the account as data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      
      console.log('The dialog was closed');
      window.location.reload();

    });
  }
  transfer(account: Account): void {
    const dialogRef = this.dialog.open(TransferComponent, {
      data: { account: account } // Pass the account as data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      
      console.log('The dialog was closed');
      window.location.reload();

    });
  }
  
}


interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}
interface Operation {
  id: number
  dateOperation: string
  montant: number
  type: string
}
interface Account {
  id: number
  dateCreation: string
  solde: number,
  etat: string,
  client: User,
  Operation: Operation[],
  decouvert: number
  tauxInteret: number
  type: string
}

