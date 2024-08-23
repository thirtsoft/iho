import { Component, Input, OnInit } from '@angular/core';
import { HospitalisationService } from '../../service/hospitalisation.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicesPartenaire } from 'src/app/admin/referentiel/models/services-partenaire';
import { ReferentielService } from 'src/app/admin/referentiel/service/referentiel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import TransferePayload from '../../models/transfere-payload';

@Component({
  selector: 'app-transfere-hospitalisation',
  templateUrl: './transfere-hospitalisation.component.html',
  styleUrls: ['./transfere-hospitalisation.component.css']
})
export class TransfereHospitalisationComponent implements OnInit {


  @Input() hospitalisationId: number;
  @Input() numeroHospitalisation: string;
  @Input() patient: string;

  motifTransfer: string;
  loading: boolean = false;
  servicePartenaires: ServicesPartenaire[];
  transferFormGroup?: FormGroup;

  constructor(
    private hospitalisationService: HospitalisationService,
    private referentielService: ReferentielService,
    public activeModal: NgbActiveModal,
    public _formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.getServicePartenaires();
    this.initTransfereFormGroup(null);
  }

  getServicePartenaires(){
    this.referentielService.getAllServicePartenaires().subscribe({
      next: (data) => {
        this.servicePartenaires = data;
      },
      error: (error) => {console.log(error)},
    })
  }

  initTransfereFormGroup(data: TransferePayload) {
    this.transferFormGroup = this._formBuilder.group({
      serviceId: [data?.serviceId ? data?.serviceId : '', [Validators.required]],
      motif: [data?.motif ? data?.motif : '', [Validators.required]],
    });
  }

  transfer() {
    const values = this.transferFormGroup.value;
    const payload: TransferePayload = {
      serviceId: values.serviceId,
      motif: values.motif
    };
    console.log("Transfere", payload);

  }

}
