import {
    Unit
} from "./Unit"
import {
    Battle
} from "./Battle"
import { Monster } from "./Monster";
import "./style/battle.scss";


export class Game {

    constructor(app) {
        this.container = app;
        this.hero;
        this.enemyList = [];
        this.enemyCounter = 0;
        this.battle;       

        this.createHero();
        this.createEnemyList();

        this.startBattle();
    }

    createHero() {
        this.hero = new Unit("Hero", "./images/unit1.png", 50, 30);
    }
    createEnemyList() {
        const enemy1 = new Monster("Enemy", "./images/monster1.png", 40, 10);
        const enemy2 = new Monster("Enemy", "./images/zombie1.png", 60, 10);
        const enemy3 = new Monster("Enemy", "./images/enemy1.png", 60, 15);
        const enemy4 = new Unit("BoSS", "./images/enemy2.png", 2000, 100);
        this.enemyList.push(enemy1);
        this.enemyList.push(enemy2);
        this.enemyList.push(enemy3);
        this.enemyList.push(enemy4);
    }

    startBattle() {
        this.battle = new Battle(this, this.hero, this.enemyList[this.enemyCounter]);
    }

    createNextBattleButton() {
        const buttonRow = document.createElement("div");
        buttonRow.classList.add("row");
        const buttonCol = document.createElement("div");
        buttonCol.classList.add("col", "text-center");
        const button = document.createElement("button");
        button.classList.add("btn", "btn-primary");
        button.textContent = "NEXT";

        button.addEventListener("click", async function () {
            this.container.innerHTML = "";
            if (this.enemyCounter < this.enemyList.length - 1) {
                this.enemyCounter++;
                this.startBattle();
                button.style.display = "none";
            }
        }.bind(this));

        buttonRow.append(buttonCol);
        buttonCol.append(button);

        this.container.append(buttonRow);
    }

}