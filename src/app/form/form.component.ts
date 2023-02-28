import { Component, OnInit } from '@angular/core';
import { FormArray,FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { __values } from 'tslib';
import { Router ,ActivatedRoute} from '@angular/router';

export interface language {
  id:number;
  name:string;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formpage!: FormGroup;
  public Submitted = false;
  obj:any={};
  paramId:any
  productid:any
  constructor(private fb: FormBuilder, private router:Router,    private route:ActivatedRoute,
    ) { }
  all: language[] = [
    {
      id:1,
      name:'Tamil',
    },
    {
      id:2,
      name:'English',
    },
    {
      id:3,
      name:'Hindi',
    },
    {
      id:4,
      name:'Others',
    },
    
  ];
  selected:any=[]
  storeData :any=[]
  checkValue(language:string,isChecked:any){
    const languages=(this.formpage.controls['language'] as FormArray)
    if(isChecked.target.checked){
      console.log(isChecked.target.checked)
      languages.push(new  FormControl(language))
    }else{
      const index=languages.controls.findIndex(x=>x.value===language);
      languages.removeAt(index)
    }
  }  
   ngOnInit(): void {
    this.formpage = this.fb.group({
      id: [1],
      name: ['', Validators.required],
      age: ['', Validators.required],
      status: ['', Validators.required],
      gender: ['', Validators.required],
      language: this.fb.array( ['', Validators.required]),
        });
        console.log(this.formpage.controls)
        console.log(this.formpage.controls['name'])

        this.paramId = this.route.snapshot.params['id'];
        console.log( this.paramId)
        this.get()
      }

  get f() {
    return this.formpage.controls;
  }
 
  submit() {


    this.Submitted = true;
    if (this.formpage.invalid) {
      return;

    }
    this.storeData.push(this.formpage.value)
    localStorage.setItem('studentdata', JSON.stringify(this.storeData));
    console.log(this.formpage.value.language);
    this.router.navigate(['/table']);
    
  }
  get() {
    this.productid = JSON.parse(localStorage.getItem("studentdata") || '{}');
    console.log(this.productid);
    for (let i = 0; i < this.productid.length; i++) {
      if(this.paramId==this.productid[i].id){
        console.log(this.productid[i])
       this.obj =this.productid[i]
      }
    }
  }
  // reset(){
  //   this.formpage.reset();
  // }
}
  





