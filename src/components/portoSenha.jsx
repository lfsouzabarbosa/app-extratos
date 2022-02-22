import React, { Component } from 'react';
import {
    Input,
    Box,
    Button,
    Text,
    Table,
    TableCell,
    TableBody,
    Loader
} from '@adminjs/design-system';
import axios from "axios";

class portoSenha extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cpf: ''
        }
        this.alterarCPF = this.alterarCPF.bind(this);
        this.alterarCNPJ = this.alterarCNPJ.bind(this);
    }

    async alterarCPF() {
        const cpf = this.state.cpf;
        const cpfdigito = cpf.substr(9, 2)
        const cpfsemdig = cpf.substr(0, 9)
        //console.log(cpfsemdig)
        //console.log(cpfdigito)
        const senha = "10203040"
        const url =  "https://wwws.portoseguro.com.br/webConsorciado/Login/TrocarSenha"
 
        var details = {
            'nroCgcCpf': cpfsemdig,
            'digCgcCpf': cpfdigito,
            'senha': senha,
            'confirmacaoSenha': senha,
            'dicaSenha': 'jamais'

        };
        
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody
        })
        alert("Senha redefinida com sucesso!")
    };

    async alterarCNPJ() {
        const cpf = this.state.cpf;
        const cpfdigito = cpf.substr(12, 2)
        const cpfsemdig = cpf.substr(0, 12)
        console.log(cpfsemdig)
        console.log(cpfdigito)
        const senha = "10203040"
        const url =  "https://wwws.portoseguro.com.br/webConsorciado/Login/TrocarSenha"
 
        var details = {
            'nroCgcCpf': cpfsemdig,
            'digCgcCpf': cpfdigito,
            'senha': senha,
            'confirmacaoSenha': senha,
            'dicaSenha': 'jamais'

        };
        
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody
        })
        alert("Senha redefinida com sucesso!")
    };

    render() {
  
        return (
            <Box display={["block", "flex"]} flexDirection="row" justifyContent="space-between" margin="2%">
                <Box flex flexDirection="row" variant="white">
                    <Table>
                        <TableBody>
                            <TableCell>
                                <Text fontSize="h5" fontWeight="2px">CPF</Text>
                                <Input id="cpf"
                                    onChange={(e) => {
                                        let valorDigitado = e.target.value;
                                        this.setState({ cpf: valorDigitado });
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <Text fontSize="h5" fontWeight="2px">Alterar</Text>
                                <Button alignSelf="center" onClick={this.alterarCPF}>
                                    <Text fontSize="h5" fontWeight="2px"><strong>...</strong></Text>
                                </Button>
                            </TableCell>
                        </TableBody>
                    </Table>
                    <Table>
                        <TableBody>
                            <TableCell>
                                <Text fontSize="h5" fontWeight="2px">CNPJ</Text>
                                <Input id="cpf"
                                    onChange={(e) => {
                                        let valorDigitado = e.target.value;
                                        this.setState({ cpf: valorDigitado });
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <Text fontSize="h5" fontWeight="2px">Alterar</Text>
                                <Button alignSelf="center" onClick={this.alterarCNPJ}>
                                    <Text fontSize="h5" fontWeight="2px"><strong>...</strong></Text>
                                </Button>
                            </TableCell>
                        </TableBody>
                    </Table>
                </Box>
            </Box>
        )

    }
}

export default portoSenha;
