
/**
 * Created by Paulo_Augusto on 04/05/2017.
 */
import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class InputPersonalizado extends Component{
    constructor(){
        super();
        this.state = {msgErro:''};
    }

    componentDidMount(){
        PubSub.subscribe("erro-validacao", function (topico, erro) {
            if(erro.field === this.props.nome){
                this.setState({msgErro:erro.defaultMessage});
            }
        }.bind(this));

        PubSub.subscribe("limpa-erros", function (topico) {
            this.setState({msgErro:''})
        }.bind(this));
    }

    render(){

            return(
                <div className="pure-control-group">
                    <label htmlFor={this.props.id}>{this.props.label}</label>
                    <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange}/>
                    <span className="erro">{this.state.msgErro}</span>
                </div>
            );
    }
}