import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeckEditorComponent } from './pages/deck-editor/deck-editor.component';

const routes: Routes = [
  { path: 'decks', component: DeckEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecksRoutingModule { }
