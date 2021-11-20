
import "./style/battle.scss";
import anime from "animejs";


export class Battle {

    constructor(app) {
        this.message = "Hello World from MyClass";
        this.container = app;
        this.battleStarted = false;
        this.battleDistance = 0;
        this.currentUnit;
        this.leftCard;
        this.rightCard;

        this.hitSound = new Audio("./sounds/attack.mp3");
        this.setBattleDistance();
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
    changeCurrentUnit() {
        if (this.currentUnit != undefined) {
            this.currentUnit.style.zIndex = "1";
        }
        if (this.currentUnit == this.leftCard) {
            this.currentUnit = this.rightCard;
        } else {
            this.currentUnit = this.leftCard;
        }
        this.currentUnit.style.zIndex = "100";
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
        this.leftCard = this.createCard("left");
        arenaLeft.append(this.leftCard);
        this.rightCard = this.createCard("right");
        arenaRight.append(this.rightCard);

        this.changeCurrentUnit();

        this.container.append(arenaRow);
        this.createBattleStartButton();
    }

    createCard(orientation) {

        const card = document.createElement("div");
        card.classList.add("card", "mx-auto", "card-" + orientation);
        card.style.width = "18rem";

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");

        card.append(this.createUnitImage(orientation));
        card.append(cardBody);
        cardBody.append(cardTitle);
        card.orientation = orientation;

        if (orientation == "left") {
            cardTitle.textContent = "Hero";
        }else{
            cardTitle.textContent = "Monster";
        }
        return card;

    }

    createUnitImage(orientation) {
        const unitImage = document.createElement("img");
        console.log(orientation)
        if (orientation == "left") {
            unitImage.classList.add("card-img-top", "imgUnitLeft");
            unitImage.src = "./images/unit1.png";
        } else {
            unitImage.classList.add("card-img-top", "imgUnitRight");
            unitImage.src = "./images/monster1.png";
        }
        
        return unitImage;
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
            } else {
                console.log("battle started");
            }
        }.bind(this));

        buttonRow.append(buttonCol);
        buttonCol.append(button);

        this.container.append(buttonRow);
    }

    async startBattle() {
        let battleDirection;
        if (this.currentUnit.orientation == "left") {
            battleDirection = 1;
        } else {
            battleDirection = -1;
        }


        // battle animation
        anime({
            targets: this.currentUnit,
            //translateX: this.distance,
            keyframes: [
                { translateY: -40 },
                { translateX: this.getBattleDistance() * battleDirection },
                //{translateY: 40},
                { translateX: 0 },
                { translateY: 0 }
            ],
            //rotate: '1turn',
            //backgroundColor: '#FFF',
            duration: 1000,
            easing: 'easeOutElastic(1, .8)',
            //direction: 'alternate'
            complete: function (anim) {
                this.changeCurrentUnit();
                this.setBattleStarted(false);
            }.bind(this)
        });
        //
        await this.sleep(400);
        this.hitSound.play();

        /*for (let index = 0; index < 5; index++) {
            console.log(index);
            await this.sleep(1000); // Pausiert die Funktion für 3 Sekunden
        }*/

        
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

}