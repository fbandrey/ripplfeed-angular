import { NgModule }       from '@angular/core';
// import { CommonModule }   from '@angular/common';

// import { AdminComponent }           from './admin.component';
// import { AdminDashboardComponent }  from './admin-dashboard.component';
// import { ManageCrisesComponent }    from './manage-crises.component';
// import { ManageHeroesComponent }    from './manage-heroes.component';

import { AdminRoutingModule } from './admin/admin-routing.module';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';

@NgModule({
  imports: [
    // CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    // AdminComponent,
    // AdminDashboardComponent,
    // ManageCrisesComponent,
    // ManageHeroesComponent
    DashboardComponent
  ]
})
export class AdminModule {}
