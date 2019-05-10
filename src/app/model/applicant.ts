import {address} from './address';

export class Applicant{

   public  id:number;
   public name:string;
   public username: string;
   public email: string;
   public address:address;
   public phone: string;
   public iconUrl:string;
   public status:string;

  //  public constructor(init? : Partial<Applicant>){
  //     Object.assign(this, init);
  //  }
   constructor (id:number, name:string, username:string, email:string  ){
    this.id = id;
    this.name = name;
    this.email = email;
    this.username = username;
  }

 
}