/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import * as AccUtils from "../accUtils";
import * as ko from "knockout";
import * as Bootstrap from "ojs/ojbootstrap";
import "oj-c/button";
import "oj-c/input-text"; // name
import 'oj-c/form-layout'; // layout
import "oj-c/input-number"; // phone
import 'oj-c/input-password'; // password
import "oj-c/input-date-text"; // date-of-birth
import "ojs/ojdatetimepicker"
class DashboardViewModel {
  
  name : ko.Observable<string> | ko.Observable<any>;
  password: ko.Observable<string> | ko.Observable<any>;
  phone: ko.Observable<number> | ko.Observable<any>;
  dob: ko.Observable<string>| ko.Observable<any>;

  constructor() {
   this.name = ko.observable(null);
   this.password = ko.observable(null);
   this.phone = ko.observable(null);
   this.dob=ko.observable(null);
  }
  public handleLogin = async (event:Event) =>  {
    let username = 'Alex';
    let password = 'alex@1234';
    let authString = username+":"+password;  
    let base64 = btoa(authString);
    let url = 'http://localhost:9999/users/login';
    let res = await fetch(url, { headers: {Authorization: 'Basic '+base64}})
    console.log(await res.json());
  }

  public handleClick = async (event : Event) => {
   let user = {
    name: this.name(), 
    password:this.password(),
    phone: this.phone(),
    dob:new Date(this.dob()).toISOString().split('T')[0]
    }
    let URL = 'http://localhost:9999/users';
    let response = await fetch(URL, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(user)
      });
    let json = await response.json();
    alert(json.message);
  }
}

export = DashboardViewModel;
