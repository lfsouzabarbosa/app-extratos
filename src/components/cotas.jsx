import React, { Component } from 'react';
import axios from "axios";


class Cotas extends Component {
    constructor(props) {
        super(props);
        this.state = {
           linhasCotas: ''
        }

        this.puxaCotas = this.puxaCotas.bind(this);
    }

    async puxaCotas() {
        const token = process.env.TOKEN
        const value = process.env.COTAS
        await axios({
            method: 'get',
            headers: { 'Authorization': 'Bearer ' + token },
            url: "https://canalconsorciado.bradesco.com.br/GatewayAutoAtendimento/autoatendimento/v1/cotas/" + value + "/dashboard/consorciado"
        })
            .then(response => {
                const ids = response.data
                console.log(response.data)
                console.log('ids >>>> ', ids);
                this.setState({ linhasCotas: ids })
            });
    };



render(){

    return(

        <div>
            {this.state.linhasCotas}
        </div>
    );
}
}

export default Cotas;