import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient) { }

  async signIn(event: Event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const emailInput = document.getElementById('email') as HTMLInputElement;
    const email = emailInput.value;   

    // Check if the email is valid
    const isValidEmail = await this.isUserEmailValid(email);
    if (isValidEmail) {
      if (email === 'admin@admin.com') {
        this.router.navigate(['/admin']); // Route to the admin component
      } else {
        this.router.navigate(['/home'], { queryParams: { email: email } });
        // Add more logic here as needed
      }
    } else {
      window.location.reload();
      console.log('Invalid email');
      // You can display an error message to the user or handle it as per your requirement
    }
  }

  async isUserEmailValid(email: string): Promise<boolean> {
    try {
      // Fetch all client emails from the API
      const listEmailUrl = 'http://' + window.location.hostname + ':8080/api/clients';
      const response: any = await this.http.get(listEmailUrl).toPromise();
      
      // Extract emails from the response
      const allClientEmails: string[] = response.map((client: any) => client.email);
      
      // Check if the provided email exists in the list
      return allClientEmails.includes(email);
    } catch (error) {
      console.error('Error fetching client emails:', error);
      // Handle error accordingly, you may want to display an error message to the user
      return false; // Return false by default in case of an error
    }
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
