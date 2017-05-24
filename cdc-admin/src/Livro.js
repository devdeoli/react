import React, {Component} from 'react';
import $ from 'jquery';
import InputPersonalizado from './componentes/InputPersonalizado';
import BotaoSubmitPersonalizado from './componentes/BotaoSubmitPersonalizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioLivro extends Component {
        constructor(){
            super();
            this.state = {nome:'', autor:'', preco:''}
            this.enviaForm = this.enviaForm.bind(this);
            this.setNome = this.setNome.bind(this);
            this.setAutor = this.setAutor.bind(this);
            this.setPreco = this.setPreco.bind(this);
        }

        enviaForm(evento) {
            evento.preventDefault();
            $.ajax({
                url:'',
                contentType: 'application/json',
                dataType: 'json',
                type: 'post',
                data: JSON.stringify({nome: this.state.nome, autor: this.state.autor, preco: this.state.preco}),
                success: function(resposta){
                    PubSub.publish('atualiza-lista-livros', resposta);
                    this.setState({nome: '', autor: '', preco: ''});
                }.bind(this),
                erro: function(resposta){
                    if(resposta === 400){
                        new TratadorErros().publicaErros(resposta.responseJSON);
                    }
                }
            });
        }

        setNome(evento){
            this.setState({nome: evento.target.value});
        }
        setAutor(evento){
            this.setState({autor: evento.target.value});
        }
        setPreco(evento){
            this.setState({preco: evento.target.value});
        }

    render(){
        return(
             <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputPersonalizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>                                              
                    <InputPersonalizado id="autor" type="text" name="autor" value={this.state.autor} onChange={this.setautor} label="Autor"/>                                              
                    <InputPersonalizado id="preco" type="number" name="preco" value={this.state.preco} onChange={this.setpreco} label="Preço"/>                                                                      
                    <BotaoSubmitPersonalizado type="submit" nome="Enviar" />
                </form>   
            </div>
        );
    }
}

class TabelaLivros extends Component{
   
    render(){
        return(
            <div>            
                <table className="pure-table">
                <thead>
                    <tr>
                    <th>Nome</th>
                    <th>Autor</th>
                    <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.lista.map(function(livro){
                            return(
                                <tr key={livro.id}>
                                    <td>{livro.nome}</td>
                                    <td>{livro.autor}</td>
                                    <td>{livro.preco}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
                </table> 
            </div>
        );
    }
}

export default class LivroBox extends Component{
     constructor(){
        super();
        this.state = {lista: []};
    }

    componentDidMount () {
        
        $.ajax({
            url: '',
            dataType: 'json',
            success: function(resposta){
                this.setState({lista: resposta});
            }.bind(this), 
            erro: function(resposta){
                console.log(resposta);
            }
        });

        PubSub.subscribe('atualiza-lista-livros', function(topico, lista){
            this.setState({lista: lista});
        }).bind(this);
    }

    render(){
        return(
             <div>
                <div className="header">
                    <h1>Cadastro de livros</h1>
                </div>
                <div className="content" id="content">
                    <FormularioLivro/>
                    <TabelaLivros lista={this.state.lista}/>
                </div>
           </div>
        );
    }
}