import {state} from '../index';
import swal from 'sweetalert';


export const planetModel = (planet) => {
    
    if(state['planet_names'].length < 4)
    {   
        //check the planet is present in already
        if(!(state['planet_names'].includes(planet))) {

            let planetInc =state.planet.find( el => el['name'] === planet);
            let distance = planetInc['distance'];
            let vehicle = state['vehicle'].find( el => el['max_distance'] >= distance && el['total_no'] > 0);
            
            if(vehicle) {
                //Update the state
            state['planet_names'].push(planet);
            //Find the distance
            state['distance'] = state['planet'].find( e => e.name === planet).distance;
            return true;
            } else {
                swal('Available vehicle are not capable of the planet. Re Think Your strategy');
            }

            
        } else {
            swal('oOps...', 'search crew is already destined to the selected planet');
            return false;
        }
    } else {
        swal('!!!', 'we have no resource left');
        return false;
    }
    
    
}