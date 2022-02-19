import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss']
})
export class SpinComponent implements OnInit {
  @Input() show: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
