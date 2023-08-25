import { Component, OnInit,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-qualification-modal',
  templateUrl: './qualification-modal.component.html',
  styleUrls: ['./qualification-modal.component.scss']
})
export class QualificationModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<QualificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
 // Assign the data to the local property

  ngOnInit(): void {
  }

}
