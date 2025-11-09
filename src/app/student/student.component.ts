import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Istudent } from './model/stuent';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(
  ) {}

  ngOnInit(): void {
  }
  @ViewChild('fname') fnameRef! : ElementRef
  @ViewChild('lname') lnameRef! : ElementRef
  @ViewChild('email') emailRef! : ElementRef
  @ViewChild('contact') contactRef! : ElementRef

  isEdit:boolean=false
  studentArr:Array<Istudent>=[{
    fname:'Jhon',
    lname:'Doe',
    email:'jhon@gmail.com',
    contact:647839480,
    Stdid:'1244'
    
  },
  {
    fname:'May',
    lname:'Doe',
    email:'may@gmail.com',
    contact:647839480,
    Stdid:'5464'
  }
]

onTodAdd():void{
  let studentObj={
    fname:this.fnameRef.nativeElement.value,
    lname:this.lnameRef.nativeElement.value,
    email:this.emailRef.nativeElement.value,
    contact:this.contactRef.nativeElement.value,
    Stdid:this.uuid()
  }

  console.log(studentObj);
  
  this.studentArr.unshift(studentObj)
  this.fnameRef.nativeElement.value=''
  this.lnameRef.nativeElement.value=''
  this.emailRef.nativeElement.value=''
  this.contactRef.nativeElement.value=''
  
  
}

onEdit(std:Istudent):void{
  this.isEdit=true
let EDIT_ID=std.Stdid
console.log(EDIT_ID);
localStorage.setItem('EDIT_ID',EDIT_ID)
this.fnameRef.nativeElement.value=std.fname,
this.lnameRef.nativeElement.value=std.lname,
this.emailRef.nativeElement.value=std.email,
this.contactRef.nativeElement.value=std.contact


}

onUpdate():void{
  let UPDATE_ID=localStorage.getItem('EDIT_ID')

  if(UPDATE_ID){
    let UPDATED_OBJ={
      fname:this.fnameRef.nativeElement.value,
    lname:this.lnameRef.nativeElement.value,
    email:this.emailRef.nativeElement.value,
    contact:this.contactRef.nativeElement.value,
    Stdid:UPDATE_ID
    }

    let i = this.studentArr.findIndex(r=>r.Stdid === UPDATE_ID)

    this.studentArr[i]=UPDATED_OBJ
    this.isEdit=false

  this.fnameRef.nativeElement.value=''
  this.lnameRef.nativeElement.value=''
  this.emailRef.nativeElement.value=''
  this.contactRef.nativeElement.value=''
  }
}

onRemove(Stdid:string):void{
let getConfirm=confirm('Are you sure, you wont to remove student name')

  if(getConfirm){
    let REMOVE_ID=Stdid
  console.log(REMOVE_ID);

  let i = this.studentArr.findIndex(r=>r.Stdid === REMOVE_ID)

  this.studentArr.splice(i,1)
  }
  
}

uuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;
        return value.toString(16);
    
    });
  }

}
