/**
 * Created by Paulo_Augusto on 05/05/2017.
 */
import React, { Component } from 'react';

export default class BotaoSubmitPersonalizado extends Component{
    render(){
        return(
            <div className="pure-control-group">
                <label></label>
                <button type="submit" className="pure-button pure-button-primary">{this.props.nome}</button>
            </div>
        );
    }
}