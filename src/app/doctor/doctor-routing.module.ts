import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorChangePasswordModule } from './doctor-change-password/doctor-change-password.module';

import { DoctorComponent } from './doctor.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'appointment',
        loadChildren: () =>
          import('./appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      {
        path: 'patients',
        loadChildren: () =>
          import('./mypatients/mypatients.module').then(
            (m) => m.MypatientsModule
          ),
      },
      {
        path: 'scheduletiming',
        loadChildren: () =>
          import('./scheduletiming/scheduletiming.module').then(
            (m) => m.ScheduletimingModule
          ),
      },
      { 
        path: 'available-timings',
        loadChildren: () => 
          import('./available-timings/available-timings.module').then(
            (m) => m.AvailableTimingsModule), 
      },
      {
        path: 'invoice',
        loadChildren: () =>
          import('./invoice/invoice.module').then((m) => m.InvoiceModule),
      },
      {
        path: 'reviews',
        loadChildren: () =>
          import('./reviews/reviews.module').then((m) => m.ReviewsModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'social-media',
        loadChildren: () =>
          import('./social-media/social-media.module').then(
            (m) => m.SocialMediaModule
          ),
      },
      {
        path: 'message',
        loadChildren: () =>
          import('./messages/messages.module').then((m) => m.MessagesModule),
      },
      { path: 'accounts', loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule) },
      { path: 'doctor-change-password', loadChildren: () => import('./doctor-change-password/doctor-change-password.module').then(m => m.DoctorChangePasswordModule) },
      { path: 'doctor-register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
      { path: 'doctor-blog', loadChildren: () => import('./doctor-blog/doctor-blog.module').then(m => m.DoctorBlogModule) },
      { path: 'doctor-add-blog', loadChildren: () => import('./doctor-add-blog/doctor-add-blog.module').then(m => m.DoctorAddBlogModule) },
      { path: 'doctor-pending-blog', loadChildren: () => import('./doctor-pending-blog/doctor-pending-blog.module').then(m => m.DoctorPendingBlogModule) },
      { path: 'doctor-edit-blog', loadChildren: () => import('./doctor-edit-blog/doctor-edit-blog.module').then(m => m.DoctorEditBlogModule) },
    ],
  },
  
  
  
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
