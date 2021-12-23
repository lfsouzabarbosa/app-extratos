import React, { Component } from 'react';
import { Input, Box, Button, Text } from '@adminjs/design-system';
import styled from 'styled-components';
import axios from "axios";
import JSONPretty from 'react-json-pretty';

const Botao = styled(Button)`
background: white;
color: #4268F6;

&:hover {
    background: #4268F6;
    color: white;
    border: 2px solid #4268F6;
};

align: center;
min-width: 60%;
fontSize: 1em;
margin-bottom: 1em;
padding: 1em 2em;
border: 2px solid #4268F6;
border-radius: 3px;
`;

class Consulta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documento: '',
            grupo: '',
            cota: '',
            contrato: '',
            cotasResposta1: '',
            cotasResposta2: '',
            cotaCompleta: '',
            cotasVerify: '',
            token: ''
        }
        this.salvar = this.salvar.bind(this);
    }

    async salvar() {

        let dados = new Object();
        dados.documento = this.state.documento
        dados.grupo = this.state.grupo
        dados.cota = this.state.cota
        dados.contrato = this.state.contrato
        console.log(dados);
        this.setState({ cotasVerify: 0 })
        axios({
            method: 'get',
            url: "http://localhost:8081",
            params: {
                documento: dados.documento,
                grupo: dados.grupo,
                cota: dados.cota,
                contrato: dados.contrato
            }
        })
            .then(response => {
                console.log(response.data)
                const token = response.data
                this.setState({ token: token })
                axios({
                    method: 'get',
                    headers: { 'Authorization': 'Bearer ' + token },
                    url: "https://canalconsorciado.bradesco.com.br/GatewayAutoAtendimento/autoatendimento/v1/cotas"
                    //url: "https://canalconsorciado.bradesco.com.br/GatewayAutoAtendimento/autoatendimento/v1/cotas/512685/dashboard/consorciado" api pega informações da cota
                })
                    .then(response => {
                        this.setState({ cotasVerify: 1 })    
                    })
                /*

                                            this.setState({ cotasVerify: 1 })
                        let resposta = response.data
                        let CotasJSON = JSON.stringify(resposta, (key, value) => {
                            if (key == "situacao") {
                                return undefined;
                            }
                            if (key == "cota") {
                                return undefined;
                            }
                            if (key == "grupo") {
                                return undefined;
                            }
                            if (key == "versao") {
                                return undefined;
                            }
                            if (key == "tipo") {
                                return undefined;
                            }
                            if (key == "bem") {
                                return undefined;
                            }
                            if (key == "valorBem") {
                                return undefined;
                            }
                            if (key == "valorParcela") {
                                return undefined;
                            }
                            if (key == "situacaoRelacionamento") {
                                return undefined;
                            }
                            if (key == "acessoPermitido") {
                                return undefined;
                            }
                            if (key == "idempresa") {
                                return undefined;
                            }
               
                            return value;
                        })
                        console.log(CotasJSON);
                        const cotasObj = JSON.parse(CotasJSON)
                        console.log(cotasObj);
                        console.log(cotasObj["idCota"])


                                     if (key == "idCota") {

                                axios({
                                    method: 'get',
                                    headers: { 'Authorization': 'Bearer ' + token },
                                    url: "https://canalconsorciado.bradesco.com.br/GatewayAutoAtendimento/autoatendimento/v1/cotas/" + value + "/dashboard/consorciado"
                                })
                                    .then(response => {
                                        console.log(response.data)
                                        this.setState({ cotasVerify: 1 })
                                        let jsoncot = JSON.stringify(response.data)
                                        let obj = JSON.parse(jsoncot);
                                        let nome = obj['cota']
                                        console.log(nome)
                                        this.setState({ cotaCompleta: nome });
                                    });
                            }



                
                                 let cotas = JSON.stringify(response.data, (key, value) => {
                            if (key == "idCota") {

                                axios({
                                    method: 'get',
                                    headers: { 'Authorization': 'Bearer ' + token },
                                    url: "https://canalconsorciado.bradesco.com.br/GatewayAutoAtendimento/autoatendimento/v1/cotas/" + value + "/dashboard/consorciado"
                                })
                                    .then(response => {
                                        console.log(response.data)
                                        this.setState({ cotasVerify: 1 })
                                        let jsoncot = JSON.stringify(response.data)
                                        let obj = JSON.parse(jsoncot);
                                        let nome = obj['cota'] 
                                        console.log(nome)
                                        this.setState({ cotasResposta: nome });
                                    });
                            }

                            return value
                        }


                           axios({
                                            method: 'get',
                                            headers: { 'Authorization': 'Bearer ' + token },
                                            url: "https://canalconsorciado.bradesco.com.br/GatewayAutoAtendimento/autoatendimento/v1/cotas/" + value + "/dashboard/consorciado"
                                        })
                                            .then(response => {
                                                console.log(response.data)
                                                this.setState({ cotasVerify: 1 })                   
                                                //this.setState({ cotasResposta: response.data });
                                            });
                
                
                this.setState({ cotasVerify: 1 })
                this.setState({ token: token })
                axios({
                    method: 'get',
                    headers: { 'Authorization': 'Bearer ' + token },
                    url: "https://canalconsorciado.bradesco.com.br/GatewayAutoAtendimento/autoatendimento/v1/cotas"
                    //url: "https://canalconsorciado.bradesco.com.br/GatewayAutoAtendimento/autoatendimento/v1/cotas/512685/dashboard/consorciado" api pega informações da cota
                })
                    .then(response => {
        
                        console.log(response.data);
                        let cotas = response.data;
        
        
                        function replacer(key, value) {
                            if (key == "idCota") {
                                axios({
                                    method: 'get',
                                    headers: { 'Authorization': 'Bearer ' + token },
                                    url: "https://canalconsorciado.bradesco.com.br/GatewayAutoAtendimento/autoatendimento/v1/cotas/" + value + "/dashboard/consorciado"
                                })
                                    .then(response => {
                                        console.log(response.data)
                                    });
                            }
        
                            return value;
                        }
        
                        let jsonCotas = JSON.stringify(cotas, replacer);
        
                        let objeto = jsonCotas;
                        objeto = { ...objeto, cotas: jsonCotas }
                        this.setState({ cotasResposta: objeto.cotas });
                    })*/
            })
            .catch(function (error) {
                alert('Erro: ' + error + ' Não foi possível localizar os dados do consórcio.. Por favor, veririfique os dados e tente novamente!');
            });
    };
    render() {
        const cotasVazias = this.state.cotasVerify
        while (cotasVazias == 0) {
            return (

                <><Box flex flexDirection="column" variant="grey" animate="true">
                    <div>
                        <Box flex flexDirection="column" variant="white">
                            <Box borderRadius="7px" minWidth="80%" marginX="2%" marginBottom="6%" justifyContent="column" marginTop="2%">
                                <Text fontSize="h4" fontWeight="3px">Documento</Text>
                                <Input id="documento"
                                    onChange={(e) => {
                                        let valorDigitado = e.target.value;
                                        this.setState({ documento: valorDigitado });
                                    }}
                                />
                            </Box>
                            <Box borderRadius="7px" minWidth="80%" marginX="2%" marginBottom="6%" justifyContent="column" marginTop="-4%">
                                <Text fontSize="h4" fontWeight="3px">Grupo</Text>
                                <Input id="grupo"
                                    onChange={(e) => {
                                        let valorDigitado = e.target.value;
                                        this.setState({ grupo: valorDigitado });
                                    }}
                                />
                            </Box>
                            <Box borderRadius="7px" minWidth="80%" marginX="2%" marginBottom="6%" justifyContent="column" marginTop="-4%">
                                <Text fontSize="h4" fontWeight="3px">Cota</Text>
                                <Input id="cota"
                                    onChange={(e) => {
                                        let valorDigitado = e.target.value;
                                        this.setState({ cota: valorDigitado });
                                    }}
                                />
                            </Box>
                            <Box borderRadius="7px" minWidth="80%" marginX="2%" marginBottom="6%" justifyContent="column" marginTop="-4%">
                                <Text fontSize="h4" fontWeight="3px">Contrato</Text>
                                <Input id="contrato"
                                    onChange={(e) => {
                                        let valorDigitado = e.target.value;
                                        this.setState({ contrato: valorDigitado });
                                    }}
                                />
                            </Box>
                            <Box borderRadius="7px" minWidth="80%" marginX="2%" marginBottom="6%" justifyContent="column" marginTop="-4%">
                                <Botao alignSelf="center" onClick={this.salvar}>
                                    <Text fontSize="h4" fontWeight="3px"><strong>Consultar</strong></Text>
                                </Botao>
                            </Box>

                        </Box>
                    </div>
                </Box></>

            )
        }
        const cotas = this.state.cotasVerify;
        /*
                const token = this.state.token;
                axios({
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
        */
        const { token } = this.state;

        if (cotas == 1) {
            return (
                <Box align-items="center" variant="grey" animate="true" >
                    <div>
                        <h5>Token Bradesco</h5>
                        <br></br>                
                        <h2>{token}</h2>
                    </div>
                </Box>
            );
        }
    }
}

export default Consulta;