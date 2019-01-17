import { Component, OnInit, Input, ViewChild, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MatMenuTrigger } from '@angular/material/menu';
import { Position } from '../../decks.models';
import { Subscription } from 'rxjs/internal/Subscription';
import { DictionariesService } from '../../services/dictionaries.service';

export interface InputMenuData {
  position: Position;
  inputText: string;
}

@Component({
  selector: 'fdm-input-context-menu',
  templateUrl: './input-context-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputContextMenuComponent implements OnInit, OnDestroy {

  @Input() openMenuRequests: Observable<InputMenuData>;

  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  menuPosition = new Position(0, 0);

  private subscriptions: Subscription;
  private inputText: string;

  constructor(private dictionariesService: DictionariesService) { }

  ngOnInit() {
    this.subscriptions = this.openMenuRequests.subscribe(item => this.openMenu(item));
  }

  ngOnDestroy(): void {
    if (this.subscriptions) this.subscriptions.unsubscribe();
  }

  openInDiki(): void {
    const url = this.dictionariesService.generateUrlForDiki(this.inputText);
    this.open(url);
  }

  openInGoogleTranslate(): void {
    const url = this.dictionariesService.generateUrlForGoogleTranslate(this.inputText);
    this.open(url);
  }

  private openMenu(data: InputMenuData): void {
    this.menuPosition = data.position;
    this.inputText = data.inputText;
    this.menuTrigger.openMenu();
  }

  private open(url: string): void {
    if (url == null) return;

    window.open(url, '_blank');
  }
}
