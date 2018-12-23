import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckEditorComponent } from './pages/deck-editor/deck-editor.component';
import { DecksRoutingModule } from './decks-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DeckEditorComponent],
  imports: [
    CommonModule,
    DecksRoutingModule,
    MatButtonModule,
    MatIconModule
  ],
  entryComponents: [DeckEditorComponent]
})
export class DecksModule { }
