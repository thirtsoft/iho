import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonServiceService } from '../common-service.service';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../admin/pages/services/authentication.service';
import { LocalStorageService } from '../admin/pages/services/local-storage.service';
import { UtilsService } from '../admin/pages/services/utils.service';

declare const $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  errorEmail = 'Le champs nom utilisateur est obligatoire';

  errorPassword = 'Le champs mot de passe est obligatoire';
  
  signInForm: any;

  hidePassword: boolean = true;

  @Input() urlNavigation = '';

  role = '';

  isClicked: boolean = false;

  adminRoles = ['ROLE_ADMIN','ROLE_MEDECIN', 'ROLE_DOCTOR' ]

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService, 
    private localStorage: LocalStorageService,
    private utilsUser: UtilsService,
  //  public toastService: ToastrService,
    private router: Router) {
      
      this.signInForm = this.formBuilder.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.isClicked = true;
    const signInRequest = {
      email: this.email.value,
      password: this.password.value
    }
    console.log("Signing in...", signInRequest);
    this.authService.signIn(signInRequest).subscribe({ 
      next: (response) => {
        console.log("Connexion successfully...", response);
        this.utilsUser.afterLoginSuccessful(response, this.urlNavigation);
      },
      error: (error) => {
        this.isClicked = false;
      //   this.toastService.error('error', 'Nom utilisateur ou de passe incorrect, veuillez ressayer');
      }
    });
  }

  get email() {
    return this.signInForm.get('email');
  }
 
  get password() {
    return this.signInForm.get('password');
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  goToForgotPassword() {
    this.router.navigate(['auth/mot-de-passe-oublie']);
  }

  /*
  isPatient: boolean = false;
  doctors: any = [];
  patients: any = [];
  username = '';
  password = '';
  constructor(
    public router: Router,
    public commonService: CommonServiceService,
    private toastr: ToastrService
  ) {
    this.username = '';
    this.password = '';
    this.doctors = [];
    this.patients = [];
  }

  ngOnInit(): void {
    this.getpatients();
    this.getDoctors();
	if($('.floating').length > 0 ){
		$('.floating').on('focus blur', function (e) {
		$(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
		}).trigger('blur');
	}
  }

  checkType(event) {
    this.isPatient = event.target.checked ? true : false;
  }

  login(name, password) {
    localStorage.setItem('auth', 'true');
    localStorage.setItem('patient', this.isPatient.toString());
    if (this.isPatient) {
      let filter = this.patients.filter(
        (a) => a.name == this.username && a.password === this.password
      );
      if (filter.length != 0) {
        localStorage.setItem('id', filter[0]['id']);
        this.toastr.success('', 'Login success!');
        this.commonService.nextmessage('patientLogin');
        this.router.navigate(['/patients/dashboard']);
      } else {
        this.toastr.error('', 'Login failed!');
      }
    } else {
      let filter = this.doctors.filter(
        (a) => a.doctor_name === this.username && a.password === this.password
      );
      if (filter.length != 0) {
        this.toastr.success('', 'Login success!');
        this.commonService.nextmessage('doctorLogin');
        localStorage.setItem('id', filter[0]['id']);
        this.router.navigate(['/doctor/dashboard']);
      } else {
        this.toastr.error('', 'Login failed!');
      }
    }
  }

  getDoctors() {
    this.commonService.getDoctors().subscribe((res) => {
      this.doctors = res;
    });
  }

  getpatients() {
    this.commonService.getpatients().subscribe((res) => {
      this.patients = res;
    });
  }
  */
}
