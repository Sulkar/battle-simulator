import "./style/index.scss";
import "bootstrap";

import {
    MyClass
} from "./MyClass"
import {
    Battle
} from "./Battle"


let meineHobbys = ["Tennis", "Basketball", "Computer"];

meineHobbys.forEach(hobby => {
    console.log(hobby);
})

//create new class
let myClass = new MyClass();
myClass.sendMessage();

//bootstrap button
const app = document.getElementById("app");
//app.insertAdjacentHTML('beforeend', '<button type="button" class="btn btn-primary">Primary</button>');


//Battle
const battle = new Battle(app);
battle.createArena();


