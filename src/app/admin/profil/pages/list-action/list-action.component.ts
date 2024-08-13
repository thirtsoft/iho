import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Action } from 'src/app/admin/pages/models/action';
import { ProfilageService } from '../../service/profilage.service';

@Component({
  selector: 'app-list-action',
  templateUrl: './list-action.component.html',
  styleUrls: ['./list-action.component.css']
})
export class ListActionComponent implements OnInit {

  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;

  listActions: Action[] = [];

  actionId: number;

  actionFormGroup!: FormGroup;

  constructor(
    private modalService: BsModalService,
    private profilageService: ProfilageService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getActions();
    this.initializeForm(null);
  }

  getActions() {
    this.profilageService.getAllActions().subscribe(
      (data: any[]) => {
        this.listActions = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  initializeForm(action: Action | null){
    this.actionFormGroup =  this._formBuilder.group({
      id: [action?.id ? action.id : ''],
      code: [action?.code ? action?.code: '', Validators.required],
      libelle: [action?.libelle ? action.libelle : '', Validators.required],
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    const payload = this.actionFormGroup.value;
    this.profilageService.createAction(payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
        this.modalRef.hide();
        this.ngOnInit();
      },
      error: (data) => {
        console.log('error', 'Erreur lors de la création : ' + data.error);
      //  this.toastService.error('error', 'Erreur lors de la création : ' + data.error);
      }
    });
  }

  editModal(template: TemplateRef<any>, action) {
    this.initializeForm(action);
    this.actionId = action.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  editer() {
    const payload = this.actionFormGroup.value;
    this.profilageService.updateAction(this.actionId, payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
        this.modalRef.hide();
        this.ngOnInit();
      },
      error: (data) => {
        console.log('error', 'Erreur lors de la création : ' + data.error);
      //  this.toastService.error('error', 'Erreur lors de la création : ' + data.error);
      }
    });
   
  }


  deleteModal(template: TemplateRef<any>, action) {
    this.id = action.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }


  deleteAction() {
    this.listActions = this.listActions.filter((a) => a.id !== this.id);
    this.profilageService.deleteAction(this.id).subscribe((data: any[]) => {
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
