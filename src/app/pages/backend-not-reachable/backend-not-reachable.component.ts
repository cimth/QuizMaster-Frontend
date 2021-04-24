import {Component, OnInit} from '@angular/core';
import {MESSAGE_ID} from '../../constants/localization/message-id';
import {LocalizationService} from '../../service/localization/localization.service';

@Component({
  selector: 'app-backend-not-reachable',
  templateUrl: './backend-not-reachable.component.html',
  styleUrls: ['./backend-not-reachable.component.css']
})
export class BackendNotReachableComponent implements OnInit {

  public MESSAGE_ID = MESSAGE_ID;

  constructor(public loc: LocalizationService) { }

  ngOnInit(): void {
  }

}
