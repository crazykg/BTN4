import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
export class PostEntity {
    "title": string = ""
    "content": string = ""
    "id": number = 0
    constructor() {

    }
}
export class PostModel extends PostEntity {

    formGroup: FormGroup = null;
    "createDate": string = ""
    "isDeleted": boolean = false  //0 Show 1 Deleted
    
    constructor() {
        super()
        var fb = new FormBuilder();
        this.formGroup = fb.group({});
        this.formGroup.addControl('title', new FormControl('', Validators.required));
        this.formGroup.addControl('content', new FormControl('', Validators.required));
        this.formGroup.addControl('id', new FormControl('', Validators.required));
    }
}