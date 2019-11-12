import {state} from '../index';

export const calcTime = () => {
    let length = state['planet_names'].length;
    let time = 0;

    for(let i=0; i < length; i++) {
        let planet = state['planet_names'][i];
        let vehicle = state['vehicle_names'][i];
        let distance;
        let speed;

        state['planet'].forEach(element => {
            if(element.name === planet) {
                distance = element['distance'];
            }
        });

        state['vehicle'].forEach(element => {
            if(element.name === vehicle) {
                speed = element['speed'];
            }
        })

        let temp = distance/speed;

        if(temp > time) {
            time = temp;
        }
    }
    return time;
}