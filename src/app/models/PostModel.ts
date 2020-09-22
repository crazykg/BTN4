import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
export class PostEntity {
    private _id = 0
    "title": string = ""
    "content": string = ""
    //"id": number = 0 
    get id(): number {
        return this._id
    }
    set id(theId: number) {
        this._id = theId
    }
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