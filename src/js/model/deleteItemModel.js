import {elements} from '../base';
import {state} from '../index';

export const deleteItem = (id) => {
    
    let vehicle = state['vehicle_names'][id];
    
    state['vehicle'].forEach(element => {
        if(element['name'] === vehicle) {
            element['total_no']++;
            let vehicleInc = vehicle.replace(' ', '_');
            document.getElementById(vehicleInc).innerHTML = element['total_no'];
        }
    });

    state['planet_names'].splice(id, 1);
    state['vehicle_names'].splice(id, 1);
    
    if(!(state['vehicle_names'].length > 0)) {
        elements.btn.innerHTML = '';
    }
}