import axios from 'axios';
import $ from "jquery";
import {elements,proxy} from './base';
import * as flip from './view/flipCard';
import * as selectVehicleView from './view/selectVehicleView';
import * as selectVehicleModel from './model/selectVehicleModel';
import * as selectPlanetView from './view/selectPlanetView';
import * as selectPlanetModel from './model/selectPlanetModel';
import * as updateCollectionsView from './view/updateCollectionView';
import * as deleteItemView from './view/deleteItemView';
import * as deleteItemModel from './model/deleteItemModel';
import {time} from './base';
import * as result from './model/result';
import * as autoComplete from './model/autoComplete';


/*
Global State of the app
*/
export const state = {};

let initOnce = async () => {
  try {
    let vehicle = await axios(`https://findfalcone.herokuapp.com/vehicles`);
    let planet = await axios(`https://findfalcone.herokuapp.com/planets`); 
    state.vehicle = vehicle.data;
    state.planet = planet.data;
  } catch (err) {
    data = `<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <link rel="stylesheet" href="css/style.css">
        </head>
        <body>
            <main>
                <section class="findFalcone-success">
                    <p class="findFalcone-success__text" >
                        404 ERR
                    </p>   
                </section>        
            </main>
        </body>
        </html>`

    let w = window.open('document');
    w.document.open();
    w.document.write(data);
    w.document.close();
  }
  
}
initOnce(); 

let init = async () => {  
    elements.pod.innerHTML = '2';
    elements.ship.innerHTML = '2';
    elements.rocket.innerHTML = '1';
    elements.shuttle.innerHTML = '1';                     
    elements.searchDisplay.innerHTML = '';
    elements.searchButton.innerHTML = '';
    elements.timeTaken.textContent = '0';
    state['vehicle_names'] = [];
    state['planet_names'] = [];
    state['gamePlay'] = true;
}
init();

let controlSelectPlanet = (e) => {
  if(state['gamePlay']) {
    //Get the input from UI
    let planet = selectPlanetView.selectPlanet(e);
    //Update the value in the global state
    let flipState = selectPlanetModel.planetModel(planet);

    if(flipState) {
      flip.flipCards();
    }
  }
};
 
(elements.searchPlanet).forEach( e => {
    e.addEventListener("click", event => {
        event.stopPropagation();
        controlSelectPlanet(event);
    })
});

let controlSelectVehicle = (e) => { 
  if(state['gamePlay']) {
    //Get the input from UI
    let vehicle = selectVehicleView.selectVehicle(e);
    console.log(vehicle);
    //Update the state
    let flipState = selectVehicleModel.vehicleModel(vehicle);

    if(flipState) {
      //Flip Card
      flip.flipCards();
      //Update the Selected Planet and Vehicle
      updateCollectionsView.updateCollections();
      //Update the UI
      UpdateUI();  
    }
  }
};

let UpdateUI = () => {
  if(state['gamePlay']) {
    time();
  }
}

(elements.searchVehicle).forEach( e => {
    e.addEventListener("click", event => {
        event.stopPropagation();
        controlSelectVehicle(event);
    })
});

let controlDeleteItem = (e) => {
  if(state['gamePlay']) {
    //Remove the item fom UI
    let id = deleteItemView.deteleItem(e);
    //Update the state 
    deleteItemModel.deleteItem(id);
    //Update UI
    UpdateUI();
    addAutoComplete();
  }
};

(elements.searchDisplay).addEventListener('click', e => {
  controlDeleteItem(e);
});

let search = async (e) => {
  if(state['gamePlay']) {
    if(e.target.getAttribute('id') === 'reset') {
      if(state['planet_names'].length !== state['vehicle_names'].length) {
        flip.flipCards();
      }
      init();
      addAutoComplete();
      
    } else {
      let op = await result.result();
      if(op) {
        state['gamePlay'] = false;
        setTimeout( () => { 
          init();
          addAutoComplete(); 
        } , 2000);   
      }
    }
  } 
}
elements.btn.addEventListener('click', e => {
  search(e);
})

elements.btn_ac.addEventListener('click', e => {
    autoComplete.autoComplete();
    elements.btn_ac.innerHTML = '';  
})

function addAutoComplete () {
  if(state['planet_names'].length === 0) {
    const markup = `<button class="button__autoComplete">
                            <i class="fab fa-searchengin icon__search"></i>
                          </button>`;

    elements.btn_ac.insertAdjacentHTML('beforeend',markup); 
  }
}