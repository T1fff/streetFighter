import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    // todo: show fighter info (image, name, health, etc.)

    const imagePreview = (fighter) => {
        const fighterImage = createFighterImage(fighter);
        fighterImage.style.height = '220px';
        if (position === 'right') {
            fighterImage.style.transform = 'scale(-1, 1)';
          }
          return fighterImage;
    }

    const addName = (fighter) => {
        const fighterName = createElement({ tagName: 'h2', className: 'fighter-preview___h2-name' });
        fighterName.innerText = fighter.name;
        fighterName.style.fontFamily = "'VT323', monospace";
        fighterName.style.textShadow = '3px 2px 1px black';
        fighterName.style.fontSize = '1.8rem';
        fighterName.style.color = 'rgb(255 119 15)';
        fighterName.style.fontSize = '1.8rem';
        fighterName.style.margin = '0.5rem 0';
        return fighterName;
      }

    const addProperties = (fighter) => {
        const fighterProps = createElement({ tagName: 'div', className: 'fighter-preview___info-props' });
        fighterProps.style.display = 'flex';

        const healthDiv = createElement({ tagName: 'div', className: 'health' });
        healthDiv.style.display = 'flex';
        const healthImg = createElement({ tagName: 'img', attributes: { src: 'https://media4.giphy.com/media/f4bdZrlxh7ALRv6Fym/giphy.gif?cid=6c09b952wrnztrusuv6moaqus6y4l2tn9pwj9zb9ktrnj94p&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s', alt: 'health' } });
        healthImg.style.width = '25px';
        healthImg.style.height = '25px';
        const healthText = createElement({ tagName: 'p'});
        healthText.innerText = fighter.health;
        healthText.style.margin = '0px';
        healthText.style.fontFamily = "'VT323', monospace";
        healthText.style.textShadow = '2px 2px 1px black';
        healthText.style.fontSize = '1.8rem';
        healthText.style.color = 'rgb(255 119 15)';
        healthDiv.append(healthImg, healthText);
      
        const attackDiv = createElement({ tagName: 'div', className: 'attack' });
        attackDiv.style.display = 'flex';
        attackDiv.style.margin = '0 1rem';
        const attackImg = createElement({ tagName: 'img', attributes: { src: 'https://media.tenor.com/LpclyzRmCA8AAAAi/ender-sword-ender.gif', alt: 'attack' } });
        attackImg.style.width = '25px';
        attackImg.style.height = '25px';
        const attackText = createElement({ tagName: 'p' });
        attackText.style.margin = '0px';
        attackText.style.fontFamily = "'VT323', monospace";
        attackText.style.textShadow = '2px 2px 1px black';
        attackText.style.fontSize = '1.8rem';
        attackText.style.color = 'rgb(255 119 15)';
        attackText.innerText = fighter.attack;
        attackDiv.append(attackImg, attackText);
      
        const defenseDiv = createElement({ tagName: 'div', className: 'defense' });
        defenseDiv.style.display = 'flex';
        const defenseImg = createElement({ tagName: 'img', attributes: { src: 'https://i.gifer.com/origin/4c/4cf9c4b3173ec5a3ba877daed7c3309f_w200.gif', alt: 'defense' } });
        defenseImg.style.width = '25px';
        defenseImg.style.height = '25px';
        const defenseText = createElement({ tagName: 'p'});
        defenseText.style.margin = '0px';
        defenseText.style.fontFamily = "'VT323', monospace";
        defenseText.style.textShadow = '2px 2px 1px black';
        defenseText.style.fontSize = '1.8rem';
        defenseText.style.color = 'rgb(255 119 15)';
        defenseText.innerText = fighter.defense;
        defenseDiv.append(defenseImg, defenseText);
      
        fighterProps.append(healthDiv, attackDiv, defenseDiv);
      
        return fighterProps;
      }

    if(fighter) {
        fighterElement.append( addName(fighter), imagePreview(fighter), addProperties(fighter));
    }

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
