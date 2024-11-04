import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/core/services/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit  {
  reservations: any[] = [];
  reservationForm: FormGroup;
  selectedReservation: any = null;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private reservationService: ReservationService) {
    this.reservationForm = this.fb.group({
      idReservation: ['', Validators.required],
      anneeUniversitaire: ['', Validators.required],
      estValide: [false]
    });
  }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this.reservationService.getAllReservations().subscribe(
      (data: any) => {
        this.reservations = data;
        console.log("Fetched reservations:", this.reservations);
      },
      (error) => {
        console.error("Error fetching reservations:", error);
      }
    );
  }

  addReservation() {
    if (this.reservationForm.valid) {
      this.reservationService.addReservation(this.reservationForm.value).subscribe(
        (newReservation) => {
          this.reservations.push(newReservation);
          console.log("Added reservation:", newReservation);
          this.reservationForm.reset();
          Swal.fire('Succès', 'Réservation ajoutée avec succès!', 'success');
        },
        (error) => {
          console.error("Error adding reservation:", error);
          Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout de la réservation.', 'error');
        }
      );
    } else {
      Swal.fire('Avertissement', 'Veuillez remplir tous les champs requis.', 'warning');
    }
  }

  editReservation(reservation: any) {
    this.isEditMode = true;
    this.selectedReservation = reservation;
    this.reservationForm.patchValue(reservation);
  }

  updateReservation() {
    if (this.reservationForm.valid && this.selectedReservation) {
      this.reservationService.modifyReservation(this.reservationForm.value).subscribe(
        (updatedReservation) => {
          const index = this.reservations.findIndex(r => r.idReservation === this.selectedReservation.idReservation);
          if (index !== -1) {
            this.reservations[index] = updatedReservation;
            console.log("Updated reservation:", this.reservations[index]);
            Swal.fire('Succès', 'Réservation mise à jour avec succès!', 'success');
          }
          this.cancelEdit();
        },
        (error) => {
          console.error("Error updating reservation:", error);
          Swal.fire('Erreur', 'Une erreur est survenue lors de la mise à jour de la réservation.', 'error');
        }
      );
    } else {
      Swal.fire('Avertissement', 'Veuillez remplir tous les champs requis.', 'warning');
    }
  }

  deleteReservation(id: string) {
    this.reservationService.removeReservation(id).subscribe(
      () => {
        this.reservations = this.reservations.filter(reservation => reservation.idReservation !== id);
        console.log("Deleted reservation with ID:", id);
        Swal.fire('Succès', 'Réservation supprimée avec succès!', 'success');
      },
      (error) => {
        console.error("Error deleting reservation:", error);
        Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression de la réservation.', 'error');
      }
    );
  }

  cancelEdit() {
    this.isEditMode = false;
    this.selectedReservation = null;
    this.reservationForm.reset();
  }
}
