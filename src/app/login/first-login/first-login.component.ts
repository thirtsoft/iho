import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { matchValidator } from 'src/app/admin/core/components/validators/match-validator';
import { AuthenticationService } from 'src/app/admin/pages/services/authentication.service';
import { LocalStorageService } from 'src/app/admin/pages/services/local-storage.service';
import { UtilsService } from 'src/app/admin/pages/services/utils.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent implements OnInit {

  firstSignInForm: any;

  hide = true;

  hideRep = true;

  errorPassword = 'Le champs mot de passe doit contenir au moins 7 caractères';
  
  errorPasswordRepeat = 'Les deux mots de passe ne sont pas identiques';


  role = '';

  token: string;

  isLoadingToken = true;

  isTokenValid = true;

  isIfAdmin = false;

  adminRoles = ['ROLE_ADMIN','ROLE_MEDECIN', 'ROLE_DOCTOR' ]

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService, 
    private localStorage: LocalStorageService,
    private utilsService: UtilsService,
    private userService: UtilisateurService,
  //  public toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
      
      this.firstSignInForm = this.formBuilder.group({
        activation: [''],
        username: [''],
        password: ['', [Validators.required, Validators.minLength(7), matchValidator('passwordRepeat', true)]],
        passwordRepeat: ['', [Validators.required, Validators.minLength(7), matchValidator('password')]],
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.getUserFromToken();
  }

  getUserFromToken() {
    this.userService.getFirstSigninUser(this.token).subscribe({
      next: (data) => {
        this.isIfAdmin = data['ifAdmin'];
        if (data['email']) {
          this.firstSignInForm = this.formBuilder.group({
            activation: [this.token],
            username: [{value: data['email'], disabled: true},],
            password: ['', [Validators.required, Validators.minLength(7), matchValidator('passwordRepeat', true)]],
            passwordRepeat: ['', [Validators.required, Validators.minLength(7), matchValidator('password')]],
          });
          this.isTokenValid = true;
        } else {
          this.isTokenValid = false;
        }
        this.isLoadingToken = false;
        
      },
      error: (error) => {
        this.isTokenValid = false;
        this.isLoadingToken = false;
      }
    })
  }

  onSubmit() {
    const firstSignInRequest = {
      activation: this.activation.value,
      password: this.password.value
    }
    this.userService.firstSignIn(firstSignInRequest, this.isIfAdmin).subscribe({ 
      next: (response) => {
        this.utilsService.afterLoginSuccessful(response, null);
      },
      error: (error) => {
         console.log(error);
      }
    });
  }

  get activation() {
    return this.firstSignInForm.get('activation');
  }

  get username() {
    return this.firstSignInForm.get('username');
  }
 
  get password() {
    return this.firstSignInForm.get('password');
  }

  get passwordRepeat() {
    return this.firstSignInForm.get('passwordRepeat');
  }

  goToForgotPassword() {
    this.router.navigate(['auth/mot-de-passe-oublie']);
  }

}
