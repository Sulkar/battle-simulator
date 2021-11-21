import "./style/unit.scss";

import anime from "animejs";

export class Unit {

    constructor(name, image, maxHP, damage) {
        this.name = name;
        this.maxHP = maxHP;
        this.hp = this.maxHP;
        this.damage = damage;
        this.image = image;
        this.orientation;
        this.card;
        this.cardTitle;
        this.cardInfo;

        this.battleTimer = 1000;
        this.battleHitTimer = 400;
        this.hitSound = new Audio("./sounds/attack.mp3");

        this.battle;
    }

    setBattle(battle){
        this.battle = battle;
    }
    async attack() {

        this.attackAnimation(this.battle);
        //enemy hit
        await this.sleep(this.battleHitTimer);
        this.hitSound.play();
        this.battle.defender.takeDamage(this.damage);
        
    }
    async attackAnimation() {
        // battle animation
        anime({
            targets: this.card,
            keyframes: [
                { translateY: -40 },
                { translateX: this.battle.battleDistance * this.battle.battleDirection },
                { translateX: 0 },
                { translateY: 0 }
            ],
            duration: this.battleTimer,
            easing: 'easeOutElastic(1, .8)',
            complete: function (anim) {
                this.battle.changeAttacker();
                if(this.battle.hasBattleStarted()){
                    this.battle.startBattle();
                }

            }.bind(this)
        });
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.defeated();
            this.battle.setBattleStarted(false);
            this.battle.setLooser(this);
        }
        this.cardInfo.textContent = "Life: " + this.hp;
    }

    defeated() {
        anime({
            targets: this.card,
            scale: 0.7,
            rotate: "45deg",
            duration: 800
        });
    }

    getCard() {
        return this.card;
    }
    createCard(orientation) {

        this.orientation = orientation;
        const card = document.createElement("div");
        card.classList.add("card", "mx-auto", "text-center","card-" + orientation);
        card.style.width = "18rem";

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        const cardInfo = document.createElement("div");
        cardInfo.classList.add("card-info");

        
        card.append(this.createUnitImage());
        card.append(cardBody);
        
        cardBody.append(cardTitle);
        cardBody.append(cardInfo);

        cardTitle.textContent = this.name;
        cardInfo.textContent = "Life: " + this.hp;

        this.card = card;
        this.cardTitle = cardTitle;
        this.cardInfo = cardInfo;
        return card;

    }

    createUnitImage() {
        const unitImage = document.createElement("img");
        unitImage.classList.add("card-img-top");
        unitImage.src = this.image;

        return unitImage;
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

}