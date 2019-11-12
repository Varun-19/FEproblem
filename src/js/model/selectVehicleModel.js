import {state} from '../index';

export const vehicleModel = (vehicle) => {

    let flip = false;
    //Check the vehicle is available
    (state.vehicle).forEach(el => {

        if(el.name === vehicle ) {
            
            if(el['max_distance'] < state['distance']) {
                swal('oOps...', `Planet is too far. Choose a vehicle which can go ${state['distance']} MegaMiles`); 
            } else if(!(el['total_no'] > 0)) {
                swal('oOps...', 'Resource limit reached');
                return false;
            }
            else {
                //Update the state
                state['vehicle_names'].push(vehicle);
                //Reduce the vehicle count
                el['total_no'] -= 1;
                let vehicleInc = vehicle.replace(' ', '_');
                document.getElementById(vehicleInc).innerHTML = el['total_no'];
                flip = true;
            }
        }
    }); 

    return flip;
    
}