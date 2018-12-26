import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckEditorComponent } from './pages/deck-editor/deck-editor.component';
import { DecksRoutingModule } from './decks-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardEditorComponent } from './components/card-editor/card-editor.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DeckEditorComponent, CardEditorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DecksRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  entryComponents: []
})
export class DecksModule { }
