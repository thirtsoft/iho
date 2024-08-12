import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientsComponent } from './patients.component';

const routes: Routes = [
  {
    path: '',
    component: PatientsComponent,
    children: [
   /*    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, */
     /*  {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      }, */
      {
        path: 'favourites',
        loadChildren: () =>
          import('./favourites/favourites.module').then(
            (m) => m.FavouritesModule
          ),
      },
      {
        path: 'booking',
        loadChildren: () =>
          import('./booking/booking.module').then((m) => m.BookingModule),
      },
      {
        path: 'component',
        loadChildren: () =>
          import('./component/component.module').then((m) => m.ComponentModule),
      },
      /* {
        path: 'patient-profile',
        loadChildren: () =>
          import('./patient-profile/patient-profile.module').then(
            (m) => m.PatientProfileModule
          ),
      }, */
      {
        path: 'add-billing',
        loadChildren: () =>
          import('./add-billing/add-billing.module').then(
            (m) => m.AddBillingModule
          ),
      },
      {
        path: 'edit-billing',
        loadChildren: () =>
          import('./edit-billing/edit-billing.module').then(
            (m) => m.EditBillingModule
          ),
      },
      {
        path: 'add-prescription',
        loadChildren: () =>
          import('./add-prescription/add-prescription.module').then(
            (m) => m.AddPrescriptionModule
          ),
      },
      {
        path: 'add-prescription',
        loadChildren: () =>
          import('./edit-prescription/edit-prescription.module').then(
            (m) => m.EditPrescriptionModule
          ),
      },
      {
        path: 'edit-prescription',
        loadChildren: () =>
          import('./add-prescription/add-prescription.module').then(
            (m) => m.AddPrescriptionModule
          ),
      },
      {
        path: 'doctor-profile',
        loadChildren: () =>
          import('./doctor-profile/doctor-profile.module').then(
            (m) => m.DoctorProfileModule
          ),
      },
      /* {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      }, */
      {
        path: 'search-doctor',
        loadChildren: () =>
          import('./search-doctor/search-doctor.module').then(
            (m) => m.SearchDoctorModule
          ),
      },
    /*   {
        path: 'success',
        loadChildren: () =>
          import('./success/success.module').then((m) => m.SuccessModule),
      }, */
      {
        path: 'checkout',
        loadChildren: () =>
          import('./checkout/checkout.module').then((m) => m.CheckoutModule),
      },
      {
        path: 'dependent',
        loadChildren: () =>
        import('./dependent/dependent.module').then((m) => m.DependentModule),
      },
     /*  {
        path: 'accounts',
        loadChildren: () =>
        import('./patient-accounts/patient-accounts.module').then(m => m.PatientAccountsModule),
       }, */
       {
         path: 'orders',
         loadChildren: () =>
         import('./orders-list/orders-list.module').then(m => m.OrdersListModule),
        },
        {
          path: 'medical-records',
          loadChildren: () =>
          import('./medical-records/medical-records.module').then(m => m.MedicalRecordsModule),
        },
        {
          path: 'medical-details',
          loadChildren: () =>
          import('./medical-details/medical-details.module').then(m => m.MedicalDetailsModule),
        },
       /*  {
          path: 'patients-change-password',
          loadChildren: () =>
          import('./patients-change-password/patients-change-password.module').then(m => m.PatientsChangePasswordModule),
        }, */
        /* {
          path: 'patient-chat',
          loadChildren: () =>
          import('./patient-chat/patient-chat.module').then(m => m.PatientChatModule),
        }, */
    ],
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
