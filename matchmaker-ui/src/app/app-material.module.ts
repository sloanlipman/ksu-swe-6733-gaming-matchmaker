import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
    declarations: [],
    imports: [
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatGridListModule,
        MatInputModule,
        MatIconModule,
        MatSnackBarModule,
        MatToolbarModule,
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatGridListModule,
        MatInputModule,
        MatIconModule,
        MatSnackBarModule,
        MatToolbarModule,
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppMaterialModule{ }
