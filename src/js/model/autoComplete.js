import {state} from '../index';
import {flipCards} from '../view/flipCard';
import {vehicleModel} from './selectVehicleModel';
import {updateCollections} from '../view/updateCollectionView';
import swal from 'sweetalert';


export const autoComplete = () => {

        if(state['planet_names'].length === state['vehicle_names'].length) {

            let len = (state['planet'].length);
            let lenInc = state['planet_names'].length;
            let arrInc = [];
            let inc = [];
            
            for(let i = 0; i < len; i++) {
                arrInc.push(i);
            }      

            state['planet_names'].forEach( el =>{
                let ind = state['planet'].findIndex( x => x.name === el);
                if( ind  >= inc[inc.length-1]) {
                    arrInc.splice(ind - inc.length,1);
                } else {
                    arrInc.splice(ind,1);
                }
                inc.push(ind);
            })

            state['vehicle'].forEach(el => {
                switch(el['name']) {
                    case 'Space rocket':
                        if(el['total_no'] === 0) {
                            let indTemp = arrInc.findIndex( x => x === 2);
                            if(indTemp !== -1) {
                                arrInc.splice(indTemp,1);
                            }                            
                        }
                        break;
                    case 'Space shuttle':
                            
                            if(el['total_no'] === 0) {
                                let indTemp = arrInc.findIndex( x => x === 3);
                                if(indTemp !== -1) {
                                    arrInc.splice(indTemp,1);
                                }
                            }
                        break;
                    case 'Space ship':
                        let con = Math.abs(el['total_no'] - 2 );
                        for(let i = 0; i < con; i++) {
                            let indTemp = arrInc.findIndex( x => x === 4 || x === 5);
                            if(indTemp !== -1) {
                                arrInc.splice(indTemp,1);
                            }
                        }
                        break;
                    default: 
                        
                }
            })

            let lenReq = 4 - lenInc;
            let lenArr = arrInc.length;
            let lenSplice = lenArr - lenReq;
            for (let i = 0; i < lenSplice; i++) {
                arrInc.splice(Math.floor(Math.random()*lenArr),1);
            }

            if(arrInc.length > 0) {
                arrInc.forEach( n => {
                    let planet = state['planet'][n]['name'];
                    let distance = state['planet'][n]['distance'];
                    state['distance'] = distance;
                    let planetInc = false;
                    if(!(state['planet_names'].includes(planet))) {
                        state['planet_names'].push(planet);
                        planetInc = true;
                    }
                    
                    if(planetInc) {
                        var vehicleInc = vehicleUpdate(distance);       
                    }
                    if(vehicleInc && planetInc) {
                        updateCollections();
                        
                    }          
                })
            } else {
                swal ('No vehicles are capable are reaching the remaining planets. Modify the selections');
            }
        }
        else {
            let planet = state['planet_names'][state['planet_names'].length - 1];
            let index = state['planet'].findIndex( x => x.name === planet);
            let distance = state['planet'][index]['distance'];
            let vehicleInc = vehicleUpdate(distance);

            if(vehicleInc) {
                updateCollections();
                flipCards();
                autoComplete();
                
            }
        }
    }

function vehicleUpdate (distance) {
    let dist = 1000;
    let ind;
    let temp;
    state['vehicle'].forEach((element,index) => {
        if(element['total_no'] > 0) {   
            temp = element['max_distance'] - distance;
            if(temp < dist && temp >= 0) {
                dist = temp;
                ind = index;
            }
        }
    });
    let vehicle = state['vehicle'][ind]['name'];
    var vehicleInc =  vehicleModel(vehicle);
    return vehicleInc;
}