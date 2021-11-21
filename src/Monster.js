import {
    Unit
} from "./Unit"

import anime from "animejs";

export class Monster extends Unit{

    constructor(name, image, maxHP, damage) {
        super(name, image, maxHP, damage);
        this.battleTimer = 2000;
        this.battleHitTimer = 800;
        this.hitSound = new Audio("./sounds/monster-attack1.ogg");
        
    }

    async attackAnimation(){
        // battle animation
        anime({
            targets: this.card,
            keyframes: [
                { translateY: +40 },
                { 
                    translateX: this.battle.battleDistance * this.battle.battleDirection,
                    rotate: '-45deg'
                },
                { translateX: 0,
                    rotate: '0deg' },
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
    
}