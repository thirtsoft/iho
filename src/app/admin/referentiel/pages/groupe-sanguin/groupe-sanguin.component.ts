import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GroupeSanguin } from '../../models/groupe-sanguin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferentielService } from '../../service/referentiel.service';

@Component({
  selector: 'app-groupe-sanguin',
  templateUrl: './groupe-sanguin.component.html',
  styleUrls: ['./groupe-sanguin.component.css']
})
export class GroupeSanguinComponent implements OnInit {

  products = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;

  groupeSanguins: GroupeSanguin[] = [];

  groupeSanguinId: number;

  groupeSanguinsFormGroup!: FormGroup;

  constructor(
    private modalService: BsModalService,
    private referentielService: ReferentielService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getGroupeSanguins();
    this.initializeForm(null);
  }

  getGroupeSanguins() {
    this.referentielService.getAllGroupeSanguins().subscribe(
      (data: any[]) => {
        this.groupeSanguins = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  initializeForm(groupeSanguin: GroupeSanguin | null){
    this.groupeSanguinsFormGroup =  this._formBuilder.group({
      id: [groupeSanguin?.id ? groupeSanguin.id : ''],
      code: [groupeSanguin?.code ? groupeSanguin.code: '', Validators.required],
      description: [groupeSanguin?.description ? groupeSanguin.description : '', Validators.required],
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    const payload = this.groupeSanguinsFormGroup.value;
    this.referentielService.createGroupeSanguin(payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
        if(data.statut === 'OK') {
          window.alert('groupeSanguin créer avec succès')
         //  this.toastService.success('succès', 'Les informations du patient ont été enregistrées avec succès !!! ');
        }else if(data.statut === 'FAILED') {
        //    this.toastService.error('error', 'Erreur lors de la création : ' + data.message);
        }
        this.modalRef.hide();
        this.ngOnInit();
      },
          
      error: (data) => {
        console.log('error', 'Erreur lors de la création : ' + data.error);
      //  this.toastService.error('error', 'Erreur lors de la création : ' + data.error);
            
      }
    });
  }

  editModal(template: TemplateRef<any>, groupeSanguin) {
    this.initializeForm(groupeSanguin);
    this.groupeSanguinId = groupeSanguin.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  editer() {
    const payload = this.groupeSanguinsFormGroup.value;
    this.referentielService.updateGroupeSanguin(this.groupeSanguinId, payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
        if(data.statut === 'OK') {
          window.alert('groupeSanguin updated avec succès')
        //  this.toastService.success('succès', 'Les informations du patient ont été enregistrées avec succès !!! ');
        }else if(data.statut === 'FAILED') {
        //    this.toastService.error('error', 'Erreur lors de la création : ' + data.message);
        }
        this.modalRef.hide();
        this.ngOnInit();
      },
      error: (data) => {
        console.log('error', 'Erreur lors de la création : ' + data.error);
      //  this.toastService.error('error', 'Erreur lors de la création : ' + data.error);
            
      }
    });
   
  }


  deleteModal(template: TemplateRef<any>, groupeSanguin) {
    this.id = groupeSanguin.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }


  deleteGroupeSanguin() {
    this.groupeSanguins = this.groupeSanguins.filter((a) => a.id !== this.id);
    this.referentielService.deleteGroupeSanguin(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.ngOnInit();
    });
  }

  decline() {
    this.modalRef.hide();
  }

  btnColor() {
    document.getElementById('btn-yes').style.backgroundColor = '#00d0f1';
    document.getElementById('btn-yes').style.border = '1px solid #00d0f1';
    document.getElementById('btn-yes').style.color = '#fff';

    document.getElementById('btn-no').style.backgroundColor = '#fff';
    document.getElementById('btn-no').style.border = '1px solid #fff';
    document.getElementById('btn-no').style.color = '#000';
  }

  btnColorNo() {
    document.getElementById('btn-no').style.backgroundColor = '#00d0f1';
    document.getElementById('btn-no').style.border = '1px solid #00d0f1';
    document.getElementById('btn-no').style.color = '#fff';

    document.getElementById('btn-yes').style.backgroundColor = '#fff';
    document.getElementById('btn-yes').style.border = '1px solid #fff';
    document.getElementById('btn-yes').style.color = '#000';
  }

}
