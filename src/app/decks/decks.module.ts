import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckEditorComponent } from './pages/deck-editor/deck-editor.component';
import { DecksRoutingModule } from './decks-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardEditorComponent } from './components/card-editor/card-editor.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DeckExportDialogComponent } from './components/deck-export-dialog/deck-export-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { CardEditorInputComponent } from './components/card-editor-input/card-editor-input.component';

@NgModule({
  declarations: [DeckEditorComponent, CardEditorComponent, DeckExportDialogComponent, CardEditorInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DecksRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule
  ],
  entryComponents: [DeckExportDialogComponent]
})
export class DecksModule { }
