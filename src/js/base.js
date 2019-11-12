import {calcTime} from './model/calculateTime';
import {updateTime} from './view/updateTime';

export const elements = {
    searchVehicle : document.querySelectorAll('.search__vehicle'),
    searchPlanet : document.querySelectorAll('.search__planet'),
    searchLink : document.querySelectorAll('.search__link'),
    card : document.querySelector('.card'),
    cardFront : document.querySelector('.card__side--front'),
    cardBack : document.querySelector('.card__side--back'),
    searchDisplay : document.querySelector('.findFalcone__search'),
    searchButton : document.querySelector('.btn'),
    timeTaken : document.querySelector('.findFalcone-time__value'),
    ac: document.querySelector('.findFalcone__autocomplete'),
    btn: document.querySelector('.btn'),
    btn_ac: document.querySelector('.findFalcone__autocomplete'),
    pod: document.getElementById('Space_pod'),
    rocket: document.getElementById('Space_rocket'),
    shuttle: document.getElementById('Space_shuttle'),
    ship: document.getElementById('Space_ship')
}

export const proxy = {
    proxy : 'https://cors-anywhere.herokuapp.com/'
}

export const time = () => {
    //Calculate Time taken
    let time = calcTime(); 
    //Update the time taken in UI
    updateTime(time);
}