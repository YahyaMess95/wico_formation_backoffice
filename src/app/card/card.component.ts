import { Component, Input } from '@angular/core';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  constructor(public modalService: NgbModal, private route: ActivatedRoute) {}
  routpath: boolean = true;
  @Input() form_info: any;
  ngOnInit() {
    this.route.url.subscribe(([url]) => {
      const path = url == undefined ? 'home' : url.path;

      this.routpath = path == 'home' ? true : false;
    });
  }

  openPopup(form_info: any) {
    const modalRef = this.modalService.open(CardDetailsComponent, {
      size: 'xl',
      modalDialogClass: 'modal-dialog-centered',
    });
    modalRef.componentInstance.form_info = form_info;
  }
}
