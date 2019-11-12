import {elements,time} from '../base';
import {state} from '../index';


export const updateCollections = () => {
        
    let markup = `<div class="findFalcone__all collection--add" id= ${[(state['planet_names']).length - 1]}>
                    <div class="findFalcone__all-selected">
                        <div class="findFalcone__all-selected__planet">
                            <i class="fas fa-globe icon__selected--planet"></i>
                            ${state['planet_names'][(state['planet_names']).length - 1]}
                        </div>
                        <div class="findFalcone__all-selected__vehicle">
                            <i class="fas fa-rocket icon__selected--vehicle"></i> 
                            ${state['vehicle_names'][(state['vehicle_names']).length - 1]}
                        </div>
                    </div>
                    <a href="#">
                        <i class="fas fa-minus-circle"></i>
                    </a>
                </div>`
    elements.searchDisplay.insertAdjacentHTML('beforeend', markup);

    let markupBtn = `<a href="#" class="btn__reset btn-add" onclick=""><i class="far fa-times-circle icon__reset" id="reset"></i></a>
    <a href="#" class="btn__find btn-addRev" onclick=""><i class="fas fa-search icon__find" id="search"></i></a>`

    elements.btn_ac.innerHTML = '';
    elements.btn.innerHTML = '';

    elements.btn.insertAdjacentHTML('beforeend', markupBtn);

    time();

} 