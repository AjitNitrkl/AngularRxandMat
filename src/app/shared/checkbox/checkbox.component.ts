import { Component, OnInit, Input } from '@angular/core';
import { Checkbox } from '../../model/checkbox.model';
import { FormGroup, FormControl } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'sidebar-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.onInit();
  }


  @Input() checkboxesDefault: Checkbox[] = [];
  @Input() checkboxDefaultName: string;
  @Input() name: string;
  @Input() title: string;
  @Input() onValueChange: (name:string, value:string[]) => void;

  public checkboxesForm: FormGroup;
  public checkAll: FormControl;
  public checkboxes: Checkbox[];
  private resetButton: boolean;


  onInit():void{
    console.log(" received checkboxes", this.checkboxesDefault)
    this.checkboxes = this.clone(this.checkboxesDefault);
    const checkedCheckboxes = this.getCheckedCheckboxes(this.checkboxes);
    console.log("Received check boxes", checkedCheckboxes);
    this.checkboxesForm = this.createFormControls(this.checkboxes, checkedCheckboxes, this.checkboxDefaultName);
  }

  getCheckedCheckboxes(checkboxes: Checkbox[]): Checkbox[]{
    return checkboxes.filter(item => item.isChecked);
  }

  createFormControls(checkboxes: Checkbox[], checkedCheckboxes: Checkbox[],
     defaultCheckboxName: string): FormGroup{

       const formGroup = new FormGroup({});
       
       checkboxes.forEach( item => {
         const value = item.isChecked || (checkedCheckboxes.length === 0 && item.name === defaultCheckboxName);
         const disabled = value && checkedCheckboxes.length <=1;

         const formControl = new FormControl({
           disabled, value
         })
         console.log("item name", item.name);
         formGroup.setControl(item.name, formControl);
       })
    
      return formGroup;
  }

clone(obj: any): any{
  if(obj === null || typeof obj !== 'object'){
    return obj;
  }
  const temp = obj.constructor();
  Object.keys(obj).forEach(key => (temp[key] = this.clone(obj[key])));
  return temp;
}

onChangeCheckbox(){
  console.log("check box clicked");
  this.onValueChange(null, null);
}

}
