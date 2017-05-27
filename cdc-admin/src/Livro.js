import React, {Component} from 'react';
import $ from 'jquery';
import InputPersonalizado from './componentes/InputPersonalizado';
import BotaoSubmitPersonalizado from './componentes/BotaoSubmitPersonalizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioLivro extends Component {
        constructor(){
            super();
            this.state = {titulo:'', preco:'', autorId:''}
            this.enviaForm = this.enviaForm.bind(this);
            this.setTitulo = this.setTitulo.bind(this);
            this.setPreco = this.setPreco.bind(this);
            this.setAutorId = this.setAutorId.bind(this);
        }

        enviaForm(evento) {
            evento.preventDefault();
            $.ajax({
                url:'http://localhost:8080/api/livros',
                contentType: 'application/json',
                dataType: 'json',
                type: 'post',
                data: JSON.stringify({titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId}),
                success: function(resposta){
                    PubSub.publish('atualiza-lista-livros', resposta);
                    this.setState({titulo: '', preco: '', autorId: ''});
                }.bind(this),
                error: function(resposta){
                    if(resposta.status === 400){
                        new TratadorErros().publicaErros(resposta.responseJSON);
                    }
                },
                beforeSend: function() {
                    PubSub.publish("limpa-erros", {});
                }
            });
        }

        setTitulo(evento){
            this.setState({titulo: evento.target.value});
        }
        setPreco(evento){
            this.setState({preco: evento.target.value});
        }
        setAutorId(evento){
            this.setState({autorId: evento.target.value});
        }

    render(){
        return(
             <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputPersonalizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} label="Título"/>                                              
                    <InputPersonalizado id="preco" type="text" name="preco" value={this.state.preco} onChange={this.setPreco} label="Preço"/>                                                                      
                    <div className="pure-control-group">
                        <label htmlFor="autorId">Autor</label>
                        <select value={this.state.autorId} name="autorId" id="autorID" onChange={this.setAutorId}>
                            <option value="">Selecione autor</option>
                            {
                                this.props.autores.map(function(autor){
                                    return <option value={autor.id}>{autor.nome}</option>
                                })
                            }
                        </select>
                    </div>
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
                                    <td>{livro.titulo}</td>
                                    <td>{livro.preco}</td>
                                    <td>{livro.autor.nome}</td>
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
        this.state = {lista: [], autores: []};
    }

    componentDidMount () {
        
        $.ajax({
            url: 'http://localhost:8080/api/livros',
            dataType: 'json',
            success: function(resposta){
                this.setState({lista: resposta});
            }.bind(this), 
            erro: function(resposta){
                console.log(resposta);
            }
        });

        $.ajax({
            url: 'http://localhost:8080/api/autores',
            dataType: 'json',
            success: function(resposta){
                this.setState({autores: resposta});
            }.bind(this), 
            erro: function(resposta){
                console.log(resposta);
            }
        });

        PubSub.subscribe('atualiza-lista-livros', function(topico, lista){
            this.setState({lista: lista});
        }.bind(this));
    }

    render(){
        return(
             <div>
                <div className="header">
                    <h1>Cadastro de livros</h1>
                </div>
                <div className="content" id="content">
                    <FormularioLivro autores={this.state.autores}/>
                    <TabelaLivros lista={this.state.lista}/>
                </div>
           </div>
        );
    }
}