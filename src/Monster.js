import {
    Unit
} from "./Unit"

import anime from "animejs";

export class Monster extends Unit{

    constructor(name, image, maxHP, damage) {
        super(name, image, maxHP+100, damage);
        this.battleHitTimer = 800;
        this.hitSound = new Audio("./sounds/monster-attack1.ogg");
        
    }

    async attackAnimation(battle){
        // battle animation
        anime({
            targets: this.card,
            keyframes: [
                { translateY: +40 },
                { 
                    translateX: battle.battleDistance * battle.battleDirection,
                    rotate: '-45deg'
                },
                { translateX: 0,
                    rotate: '0deg' },
                { translateY: 0 }
            ],
            duration: 2000,
            easing: 'easeOutElastic(1, .8)',
            complete: function (anim) {
                battle.changeAttacker();
                battle.setBattleStarted(false);
               
            }.bind(this)
        });
    }
    
}