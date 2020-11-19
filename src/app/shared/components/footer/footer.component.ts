import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mob-timer-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public copyright: string;

  constructor() { }

  ngOnInit(): void {
    const year = new Date().getFullYear();
    this.copyright = `&copy; ${year}`;
  }

}
