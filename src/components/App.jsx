import React from 'react';
import 'core-js/es6/map';
import 'core-js/es6/set';
import './style.scss';
import {CONFIGSERVICES} from 'APICONFIG'
import brand from '../static/img/Spotify.png'

export default class App extends React.Component{
    render(){
        return(
            <div className="test-class">
                Enjoy extending the Startup Kit!!!!
                {CONFIGSERVICES.BASE_URL}
                <div>
                <span style={{color:'green'}}>Spotify Icon:</span> <img src={brand}></img>
                </div>
            </div>
            )
    }
}