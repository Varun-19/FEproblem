import {elements} from '../base';

export const selectPlanet = (e) => {
    return e.target.getAttribute('data-planet');
}
