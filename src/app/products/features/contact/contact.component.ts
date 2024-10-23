import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ContactComponent {
  email: string = '';
  message: string = '';
  successMessage: string = '';

  // Fonction qui sera appelée lors de la soumission du formulaire
  onSubmit(contactForm: any) {
    if (contactForm.valid) {
      // Simuler l'envoi du message (on pourrait utiliser un service pour envoyer à un backend)
      this.successMessage = "Demande de contact envoyée avec succès";
      contactForm.reset();  // Réinitialiser le formulaire après l'envoi
    }
  }
}
