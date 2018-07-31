import { Component, OnInit } from '@angular/core';

export interface IReasonCode {
  code: string;
  reason: string;
}

@Component({
  selector: 'app-reason-keys',
  templateUrl: './reason-keys.component.html',
  styleUrls: ['./reason-keys.component.css']
})
export class ReasonKeysComponent implements OnInit {

  displayedColumns: string[] = ['code', 'reason'];

  returnReasonCodes: IReasonCode[] = [
    { code: '1', reason: 'Dont like the item' },
    { code: '2', reason: 'Looks different to image onsite' },
    { code: '3', reason: 'Ordered more than one size' },
    { code: '4', reason: 'Too big' },
    { code: '5', reason: 'Too small' },
    { code: '6', reason: 'Faulty' },
    { code: '7', reason: 'Incorrect item received' },
    { code: '8', reason: 'Quality not as expected' },
    { code: '9', reason: 'Late delivery' },
    { code: '0', reason: 'No reason' }
  ];

  faultyReasonCodes: IReasonCode[] = [
    { code: '1', reason: 'Marked/Stains' },
    { code: '2', reason: 'Scratched Sole' },
    { code: '3', reason: 'Broken Heel' },
    { code: '4', reason: 'Broken Zips' },
    { code: '5', reason: 'Broken Strap/Broken Buckles' },
    { code: '6', reason: 'Inner Sole Coming Away' },
    { code: '7', reason: 'Damaged Laces' },
    { code: '8', reason: 'Two Different Sizes' },
    { code: '9', reason: 'Pulled Threads' },
    { code: '10', reason: 'Two Of The Same Foot' },
    { code: '11', reason: 'Ripped' },
    { code: '12', reason: 'Worn' },
    { code: '13', reason: 'Smells' },
    { code: '0', reason: 'No reason' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
