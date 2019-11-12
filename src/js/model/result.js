import axios from 'axios';
import {autoComplete} from '../model/autoComplete';
import swal from 'sweetalert';
import {state} from '../index';



export const result = () => {
    
    return new Promise ((resolve,reject) => {
        if(state['vehicle_names'].length === 4) {
            fetchResult();
            resolve(true);
        } else {
            swal('!!!',`we still have ${4 - state['vehicle_names'].length} resource, please put them to use`, {
                buttons:[{
                    text: "AutoComplete",
                    value: false,
                    visible: true,
                    className: "btn__ghost",
                    closeModal: true,
                  },{
                    text: "Do it",
                    value: true,
                    visible: true,
                    className: "btn__focus",
                    closeModal: true,
                  }]
            }).then((value) => {
                if(!value) {
                    autoComplete();
                }
            })
        }  
    })    
}

let fetchResult = async () => {
    
    let token = await axios.post(`https://findfalcone.herokuapp.com/token`,{ },{
        headers : {'Accept' : 'application/json'}
    });
    token = token.data.token;
    let body = {
        'token' : token,
        'planet_names' : state['planet_names'],
        'vehicle_names' : state['vehicle_names']
    }

    let headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }

    let result = await axios.post('https://findfalcone.herokuapp.com/find',body, {
        headers : headers
    })
    let status = result.data.status;
    let planet = result.data['planet_name'];
    let data;
    console.log(result.data);

    if(status === 'success') {
        data = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>Document</title>
                        <link rel="stylesheet" href="css/style.css">
                    </head>
                    <body>
                        <main>
                            <section class="findFalcone-success" >
                                <p class="findFalcone-success__text" >
                                    Success!. Congratulations on finding Falcone <br> King Khan is pleased
                                    <br><br>
                                    Found in ${planet}
                                </p>   
                            </section>        
                        </main>
                    </body>
                    </html>`
    } else {
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
                        Queen Al Falcone not found
                        <br>Don't lose hope. Get yourself up and try again
                    </p>   
                </section>        
            </main>
        </body>
        </html>`
    }

    let w = window.open('document');
    w.document.open();
    w.document.write(data);
    w.document.close();
}