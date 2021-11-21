import "./style/index.scss";
import "bootstrap";

import {
    Unit
} from "./Unit"
import {
    Battle
} from "./Battle"
import { Monster } from "./Monster";



//bootstrap button
const app = document.getElementById("app");
//app.insertAdjacentHTML('beforeend', '<button type="button" class="btn btn-primary">Primary</button>');

//Units
const hero = new Unit("Hero", "./images/unit1.png", 50, 30);
const enemy = new Monster("Enemy", "./images/monster1.png", 50, 10);
//Battle
const battle = new Battle(app, hero, enemy);
battle.createArena();


