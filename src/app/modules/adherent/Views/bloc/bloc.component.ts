import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlocService } from 'src/app/core/services/bloc.service';
import { Bloc } from 'src/app/models/bloc';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bloc',
  templateUrl: './bloc.component.html',
  styleUrls: ['./bloc.component.css']
})
export class BlocComponent {
  blocs: Bloc[] = [];
  blocForm: FormGroup;
  selectedBloc!: Bloc  ;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private blocService: BlocService) {
    this.blocForm = this.fb.group({
      idBloc: ['', Validators.required],
      nomBloc: ['', Validators.required],
      capaciteBloc: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.getBlocs();
  }

  getBlocs() {
    this.blocService.getBlocs().subscribe(
      (data: Bloc[]) => {
        this.blocs = data;
      },
      (error : any) => {
        console.error("Error fetching blocs:", error);
      }
    );
  }

  addBloc() {
    if (this.blocForm.valid) {
      this.blocService.addBloc(this.blocForm.value).subscribe(
        (newBloc: any) => {
          this.blocs.push(newBloc);
          this.blocForm.reset();
          Swal.fire('Succès', 'Bloc ajouté avec succès!', 'success');
        },
        (error: any) => {
          console.error("Error adding bloc:", error);
          Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout du bloc.', 'error');
        }
      );
    } else {
      Swal.fire('Avertissement', 'Veuillez remplir tous les champs requis.', 'warning');
    }
  }

  editBloc(bloc: Bloc) {
    this.isEditMode = true;
    this.selectedBloc = bloc;
    this.blocForm.patchValue(bloc);
  }

  updateBloc() {
    if (this.blocForm.valid && this.selectedBloc) {
      this.blocService.modifyBloc(this.blocForm.value).subscribe(
        (updatedBloc) => {
          // Make sure selectedBloc is not null before accessing its properties
          if (this.selectedBloc) {
            const index = this.blocs.findIndex(b => b.idBloc === this.selectedBloc.idBloc);
            if (index !== -1) {
              this.blocs[index] = updatedBloc;
              console.log("Bloc mis à jour :", this.blocs[index]);
              Swal.fire('Succès', 'Bloc mis à jour avec succès!', 'success');
            }
          }
          this.cancelEdit();
        },
        (error) => {
          console.error("Erreur lors de la mise à jour du bloc :", error);
          Swal.fire('Erreur', 'Une erreur est survenue lors de la mise à jour du bloc.', 'error');
        }
      );
    } else {
      Swal.fire('Avertissement', 'Veuillez remplir tous les champs requis.', 'warning');
    }
  }
  
  

  deleteBloc(id: number) {
    this.blocService.removeBloc(id).subscribe(
      () => {
        this.blocs = this.blocs.filter(bloc => bloc.idBloc !== id);
        Swal.fire('Succès', 'Bloc supprimé avec succès!', 'success');
      },
      (error : any) => {
        console.error("Error deleting bloc:", error);
        Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression du bloc.', 'error');
      }
    );
  }

  cancelEdit() {
    this.isEditMode = false;
    this.selectedBloc;
    this.blocForm.reset();
  }
}
