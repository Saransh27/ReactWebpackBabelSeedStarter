import React from 'react';
import 'core-js/es6/map';
import 'core-js/es6/set';
import {CONFIGSERVICES} from 'APICONFIG'

export default class App extends React.Component{
    render(){
        return(
            <div className="test-class">
                Enjoy extending the Startup Kit!!!
                {CONFIGSERVICES.BASE_URL}
            </div>
            )
    }
}