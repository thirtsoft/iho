import { Component, OnInit, TemplateRef } from '@angular/core';
import { Hospitalisation } from '../../models/hospitalisation';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HospitalisationService } from '../../service/hospitalisation.service';
import { LocalStorageService } from 'src/app/admin/pages/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hospitalisations',
  templateUrl: './hospitalisations.component.html',
  styleUrls: ['./hospitalisations.component.css']
})
export class HospitalisationsComponent implements OnInit {

  hostpitalisationList: Hospitalisation[] = [];
  errorMessage: string;
  modalRef: BsModalRef;
  id: any; name : any;

  constructor(public hospitalisationService: HospitalisationService,
              private localStorage: LocalStorageService,
              private router: Router,
              private modalService: BsModalService
  ) { 
  }

  ngOnInit(): void {
    this.getHospitalisations();
  }

  getHospitalisations() {
    this.hospitalisationService.getAllHospitalisations()
      .subscribe(res => {
        this.hostpitalisationList = res;
        console.log(this.hostpitalisationList);
        $(function () {
          $("table").DataTable();
        });
      },
      error => this.errorMessage = <any>error);
  }k

  ajouterHospitalisation() {
    this.router.navigate(['/admin/hospitalisations/create']);
  }

  editerHostpitalisation(patientId: number) {
    this.router.navigate(['/admin/hospitalisations/edit', patientId]);
  }

  voirDetailHostpitalisation(patientId: number) {
    this.router.navigate(['/admin/hospitalisations/details', patientId]);
  }


  deleteModal(template: TemplateRef<any>, hostpitalisation) {
    this.id = hostpitalisation.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteHostpitalisation(hostpitalisationId: number){
    this.hospitalisationService.deleteHospitalisation(hostpitalisationId).subscribe(
      {
        next: () =>{
      //    this.toastr.success('success', `Suppression du patient effectué avec succès`);
          window.location.reload();
        },
        error: (error) =>{
          /*
           this.toastr.error('error', ` Erreur lors de la suppression du patient,
          Veuillez reessayer ulterieurement`);*/
        }
      }
    )
  }

  decline() {
    this.modalRef.hide();
  }

}
