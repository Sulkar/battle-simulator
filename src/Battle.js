
import "./style/battle.scss";


export class Battle {

    constructor(game, unit1, unit2) {
        this.message = "Hello World from MyClass";
        this.game = game;
        this.container = this.game.container;
        this.battleStarted = false;
        this.battleDistance = 0;
        this.battleDirection;
        this.leftCard;
        this.rightCard;

        this.unit1 = unit1;
        this.unit1.setBattle(this);
        this.unit2 = unit2;
        this.unit2.setBattle(this);

        this.attacker;
        this.defender;
        this.looser;
        this.winner;

        this.setBattleDistance();
        this.createArena();
    }

    setBattleDistance() {
        this.battleDistance = document.querySelector('.container').clientWidth / 3;
    }
    getBattleDistance() {
        return this.battleDistance;
    }

    hasBattleStarted() {
        return this.battleStarted;
    }
    toggleBattleStarted() {
        this.battleStarted = !this.battleStarted;
    }
    setBattleStarted(boolean) {
        this.battleStarted = boolean;
    }
    changeAttacker() {
        if (this.attacker != undefined) {
            this.attacker.getCard().style.zIndex = "1";
        }
        if (this.attacker == this.unit1) {
            this.defender = this.unit1;
            this.attacker = this.unit2;
        } else {
            this.defender = this.unit2;
            this.attacker = this.unit1;
        }
        this.attacker.getCard().style.zIndex = "100";
    }
    createArena() {
        const arenaRow = document.createElement("div");
        arenaRow.classList.add("row");
        const arenaLeft = document.createElement("div");
        arenaLeft.classList.add("col");
        const arenaRight = document.createElement("div");
        arenaRight.classList.add("col");


        arenaRow.append(arenaLeft);
        arenaRow.append(arenaRight);

        //create Cards

        this.leftCard = this.unit1.createCard("left");
        arenaLeft.append(this.leftCard);
        this.rightCard = this.unit2.createCard("right");
        arenaRight.append(this.rightCard);

        this.changeAttacker();

        this.container.append(arenaRow);
        this.createBattleStartButton();
    }

    createBattleStartButton() {
        const buttonRow = document.createElement("div");
        buttonRow.classList.add("row");
        const buttonCol = document.createElement("div");
        buttonCol.classList.add("col", "text-center");
        const button = document.createElement("button");
        button.classList.add("btn", "btn-primary");
        button.textContent = "START";

        button.addEventListener("click", async function () {
            if (!this.hasBattleStarted()) {
                this.setBattleStarted(true);
                this.startBattle();
                button.style.display = "none";
            }
        }.bind(this));

        buttonRow.append(buttonCol);
        buttonCol.append(button);

        this.container.append(buttonRow);
    }

    async startBattle() {

        for (let index = 0; index < 1; index++) {


            if (this.attacker.orientation == "left") {
                this.battleDirection = 1;
            } else {
                this.battleDirection = -1;
            }
            await this.attacker.attack();

        }
    }

    setLooser(unit) {
        if (unit == this.unit1) {
            this.looser = this.unit1;
            this.winner = this.unit2;
        }
        else {
            this.looser = this.unit2;
            this.winner = this.unit1;
        }
        this.createBattleEnd();
    }
    createBattleEnd() {
        this.looser.cardTitle.textContent = this.looser.name + " hat verloren!";
        this.looser.cardTitle.classList.add("bg-danger", "text-white");

        this.winner.cardTitle.textContent = this.winner.name + " hat gewonnen!";
        this.winner.cardTitle.classList.add("bg-success", "text-white");

        this.game.createNextBattleButton();
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

}