import {elements} from '../base';

export const deteleItem = (e) => {
    let ID = e.target.parentNode.parentNode.getAttribute('id');
    let el = document.getElementById(ID);
    el.parentNode.removeChild(el);
    return ID; 
}