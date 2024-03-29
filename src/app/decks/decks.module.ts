import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckEditorComponent } from './pages/deck-editor/deck-editor.component';
import { DecksRoutingModule } from './decks-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardEditorComponent } from './components/card-editor/card-editor.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DeckExportDialogComponent } from './components/deck-export-dialog/deck-export-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { CardEditorInputComponent } from './components/card-editor-input/card-editor-input.component';
import { GermanLettersMenuComponent } from './components/german-letters-menu/german-letters-menu.component';
import { InputContextMenuComponent } from './components/input-context-menu/input-context-menu.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeckImportDialogComponent } from './components/deck-import-dialog/deck-import-dialog.component';

@NgModule({
  declarations: [DeckEditorComponent, CardEditorComponent,
    DeckExportDialogComponent, CardEditorInputComponent,
    GermanLettersMenuComponent, InputContextMenuComponent,
    DeckImportDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DecksRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  entryComponents: [DeckExportDialogComponent, DeckImportDialogComponent]
})
export class DecksModule { }
