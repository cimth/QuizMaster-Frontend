import {Component} from '@angular/core';
import {LocalizationService} from '../../service/localization/localization.service';
import {MESSAGE_ID} from '../../constants/localization/message-id';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {

  public MESSAGE_ID = MESSAGE_ID;

  constructor(public loc: LocalizationService) { }

}
