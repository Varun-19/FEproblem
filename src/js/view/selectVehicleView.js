import {elements} from '../base';

export const selectVehicle = (e) => {
    return e.target.getAttribute('data-vehicle');
} 