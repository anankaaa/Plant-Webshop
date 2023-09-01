import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  @Output() sideLink: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick(event: Event) {
    let clickedElement = event.target as HTMLElement;
    let currentClassList = clickedElement.classList;
    let sideLinks = document.querySelectorAll('a.nav-link');
    sideLinks.forEach((item) => {
      item.classList.remove('bg-gradient-success');
    });
    currentClassList.add('bg-gradient-success');
    this.sideLink.emit(clickedElement.children[1].innerHTML);
  }
}
