
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
        this.cardInfo;
        this.battleHitTimer = 400;
        this.hitSound = new Audio("./sounds/attack.mp3");
    }

    async attack(battle) {
        this.attackAnimation(battle);
        //enemy hit
        await this.sleep(this.battleHitTimer);
        this.hitSound.play();
        battle.defender.takeDamage(this.damage);
    }
    async attackAnimation(battle){
        // battle animation
        anime({
            targets: this.card,
            keyframes: [
                { translateY: -40 },
                { translateX: battle.battleDistance * battle.battleDirection },
                { translateX: 0 },
                { translateY: 0 }
            ],
            duration: 1000,
            easing: 'easeOutElastic(1, .8)',
            complete: function (anim) {
                battle.changeAttacker();
                battle.setBattleStarted(false);
               
            }.bind(this)
        });
    }

    takeDamage(damage) {
        this.hp -= damage;
        if(this.hp <= 0){
            this.defeated();
        }
        this.cardInfo.textContent = "Life: " + this.hp;
    }

    defeated(){
        anime({
            targets: this.card,
            scale: 0.7,
            rotate: "45deg",
            duration: 800
          });
    }

    getCard(){
        return this.card;
    }
    createCard(orientation) {

        this.orientation = orientation;
        const card = document.createElement("div");
        card.classList.add("card", "mx-auto", "card-" + orientation);
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
        this.cardInfo = cardInfo;
        return card;

    }

    createUnitImage() {
        const unitImage = document.createElement("img");
        unitImage.classList.add("card-img-top", "imgUnitLeft");
        unitImage.src = this.image;

        return unitImage;
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

}