import { Component, Input, OnInit } from '@angular/core';
import { Mob } from '@dtm/models';

@Component({
  selector: 'mob-timer-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() mob: Mob;

  public mobLink: string;
  public hasCopiedLink: boolean;

  constructor() { }

  public ngOnInit(): void {
    this.mobLink = document.location.href;
    this.hasCopiedLink = false;
  }

  public copyLink(): void {
    const event = (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', this.mobLink);
      e.preventDefault();
    };
    document.addEventListener('copy', event);
    document.execCommand('copy');
    this.hasCopiedLink = true;
    setTimeout(() => this.hasCopiedLink = false, 3000);
  }

}
