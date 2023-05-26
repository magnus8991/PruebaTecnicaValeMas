import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {
  @Input() title;
  @Input() message;

  constructor(public activeModal: NgbActiveModal, private detect: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.detect.detectChanges();
  }
}
