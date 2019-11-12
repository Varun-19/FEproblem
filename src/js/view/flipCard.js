import {elements} from '../base';

export const flipCards = () => {
  
    if(elements.cardFront.classList.contains('card--flipped')) {
      
      elements.cardFront.classList.add('card--unflip');
      elements.cardBack.classList.add("card--unflipBack");
      
      setTimeout(function(){
        elements.cardFront.classList.remove('card--flipped', 'card--unflip');
        elements.cardBack.classList.remove('card--flippedBack', 'card--unflipBack');
      }, 500);
    
    } else { 
      elements.cardFront.classList.add("card--flipped");
      elements.cardBack.classList.add("card--flippedBack");
    }
  }