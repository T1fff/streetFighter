import controls from '../../constants/controls';
import showWinnerModal from './modal/winner';

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        const firstFighterHealthBar = document.getElementById('left-fighter-indicator');
        const secondFighterHealthBar = document.getElementById('right-fighter-indicator');
        const pressedKeys = new Set();
        let lastCriticalAttackTime = null;

        const fighterData = {
            blocking: false,
            attacking: false,
            criticalAttack: false
        };

        const fighter1 = {
            ...firstFighter,
            ...fighterData,
            healthBar: firstFighterHealthBar,
            healthDuringBattle: firstFighter.health
        };

        const fighter2 = {
            ...secondFighter,
            ...fighterData,
            healthBar: secondFighterHealthBar,
            healthDuringBattle: secondFighter.health
        };

        function checkCombination(pressedKeys, combination) {
            for (const key of combination) {
                if (!pressedKeys.has(key)) {
                    return false;
                }
            }
            return true;
        }

        const timePassed = (lastCriticalAttackTime) => {
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - lastCriticalAttackTime;
            const timeThreshold = 10000;
          
            return timeDifference >= timeThreshold;
          };

        const handlerKeyDown = e => {
            if (!e.repeat) {
                switch (e.code) {
                    case controls.PlayerOneAttack: {
                        fighter1.attacking = true;
                        attack(fighter1, fighter2);
                        break;
                    }

                    case controls.PlayerTwoAttack: {
                        fighter2.attacking = true;
                        attack(fighter2, fighter1);
                        break;
                    }

                    case controls.PlayerOneBlock: {
                        fighter1.blocking = true;
                        break;
                    }

                    case controls.PlayerTwoBlock: {
                        fighter2.blocking = true;
                        break;
                    }
                }
            }

            pressedKeys.add(e.code);

            if (checkCombination(pressedKeys, controls.PlayerOneCriticalHitCombination)) {
                fighter1.criticalAttack = true;
                attack(fighter1, fighter2);
            }

            if (checkCombination(pressedKeys, controls.PlayerTwoCriticalHitCombination)) {
                fighter2.criticalAttack = true;
                attack(fighter2, fighter1);
            }
        };

        const handlerKeyUp = e => {
            switch (e.code) {
                case controls.PlayerOneAttack: {
                    fighter1.attacking = false;
                    break;
                }

                case controls.PlayerTwoAttack: {
                    fighter2.attacking = false;
                    break;
                }

                case controls.PlayerOneBlock:
                    fighter1.blocking = false;
                    break;

                case controls.PlayerTwoBlock:
                    fighter1.blocking = false;
                    break;
            }

            pressedKeys.delete(e.code);
        };

        window.addEventListener('keydown', handlerKeyDown);
        window.addEventListener('keyup', handlerKeyUp);

        const attack = (attacker, defender) => {
            let damage = null;

            if (attacker.criticalAttack) {
                const isTimePassed = lastCriticalAttackTime ? timePassed(lastCriticalAttackTime) : true;
                if (isTimePassed) {
                    damage = getcriticalAttack(attacker);
                    lastCriticalAttackTime = new Date().getTime();
                } else {
                    return;
                }
            } else {
                damage = getDamage(attacker, defender);
            }
            defender.healthDuringBattle -= damage;
            defender.healthBarIndicator = (defender.healthDuringBattle / defender.health) * 100;
            if (defender.healthBarIndicator <= 0) {
                defender.healthBarIndicator = 0;
                resolve(attacker);
            }
            defender.healthBar.style.width = `${defender.healthBarIndicator}%`;
        };
    });
}

export function getDamage(attacker, defender) {
    const damage = getHitPower(attacker) - getBlockPower(defender);
    if (damage > 0) {
        return damage;
    } else {
        return 0;
    }
}

export function getHitPower(fighter) {
    const hitPower = fighter.attack * (Math.random() * (2 - 1) + 1);
    return hitPower;
}

export function getBlockPower(fighter) {
    let blockPower = fighter.defense * (Math.random() * (2 - 1) + 1);
    if (fighter.blocking) {
        return blockPower;
    } else {
        return 0;
    }
}

export function getcriticalAttack(fighter) {
    const criticalAttackValue = fighter.attack * 2;
    return criticalAttackValue;
}
