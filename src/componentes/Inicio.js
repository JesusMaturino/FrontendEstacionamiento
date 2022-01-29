import React, { Component } from 'react';
import axios from 'axios';
import './Inicio.css';
import history from '../history';

class Inicio extends Component {
  constructor(props){
    super(props);
    this.state={
      message: '',
      message2: '',
      message3: '',
      array: []
    }
    this.Registrar = this.Registrar.bind(this);
    this.Salida = this.Salida.bind(this);
    this.Ver = this.Ver.bind(this);
    this.Reload = this.Reload.bind(this);
    this.Clean = this.Clean.bind(this);
  }

  Clean(){
    var message = " ";
    this.setState({
        message:message,
        message2:message,
        message3:message
    });
   }

  Reload(){
    history.push('/');
    window.location.reload(true);
  }
  
  async Registrar() {

    var numero_placa = document.getElementById("placa").value;
    var tipo = document.getElementById("tipo").value;

    if (numero_placa === '' || tipo === ''){
        var message = "Completa todos los campos.";
        this.setState({message:message});
        setTimeout(this.Clean,3000);
    }else{

    let date = new Date()

    let dia = date.getDate()
    let mes = date.getMonth() + 1
    let year = date.getFullYear()
    let hora = date.getHours()
    let minuto = date.getMinutes()

    if (mes < 10) {
        mes = "0"+mes;
    }

    let fecha_completa = ""+year+"-"+mes+"-"+dia+"T"+hora+":"+minuto+":00.000Z";

    var payload={
        "numero_placa": numero_placa,
        "tiempo_entrada": fecha_completa,
        "tiempo_salida": fecha_completa,
        "tipo": tipo
    }

    console.log(payload);

        axios.post('http://localhost:8000', payload)
        .then((response) => {
            
            if(response.status === 200){

                var message = "Guardado correctamente.";
                this.setState({message:message});
                setTimeout(this.Reload,3000);

            }
        })

        .catch((error) => {
            console.log(error);
        });
    }
    }

    async Salida() {

        var numero_placa = document.getElementById("placaSalida").value;

        if (numero_placa === ''){
            var message2 = "Completa el campo.";
            this.setState({message2:message2});
            setTimeout(this.Clean,3000);
        }else{

        let date = new Date()

        let dia = date.getDate()
        let mes = date.getMonth() + 1
        let year = date.getFullYear()
        let hora = date.getHours()
        let minuto = date.getMinutes()

        if (mes < 10) {
            mes = "0"+mes;
        }

        let fecha_completa = ""+year+"-"+mes+"-"+dia+"T"+hora+":"+minuto+":00.000Z";
        
        var payload={
            "numero_placa": numero_placa,
            "tiempo_salida": fecha_completa
        }
    
        console.log(payload);
    
            axios.put('http://localhost:8000', payload)
            .then((response) => {
                
                if(response.status === 200){
    
                    var message2 = "Guardado correctamente.";
                    this.setState({message2:message2});
                    setTimeout(this.Reload,3000);
    
                }
            })
    
            .catch((error) => {
                console.log(error);
            });
        }
    }

    async Ver() {

        var fecha = document.getElementById("fecha").value;
        var hora = document.getElementById("hora").value;

        if (fecha === '' || hora === ''){
            var message3 = "Completa todos los campos.";
            this.setState({message3:message3});
            setTimeout(this.Clean,3000);
        }else{
        
        let tiempo_entrada = ""+fecha+"T"+hora+":00.000Z";
        console.log(tiempo_entrada)

    
            axios.get('http://localhost:8000/'+tiempo_entrada)
            .then((response) => {
                
                if(response.status === 200){
    
                    // var array = []

                    // for (const key in response.data) {

                    //   arrayCompleto.push(response.data[key].idFORMULARIO)

                    // }

                    // this.setState({
                    // array: array
                    // })
    
                }
            })
    
            .catch((error) => {
                console.log(error);
            });
        }
    }


render() {
    return (
      <div>        

        <div className='div-2'>

        <div className='div-1'>
          <div>
            <h1>Registrar vehiculo</h1>
          </div>
          <div>
            <text>Numero de Placa:   </text>
            <input type="text" label="Placa" id="placa" required></input>
            <br/><br/>
            <text>Tipo de vehiculo:   </text>
            <select name="tipo" id="tipo">
                <option value="oficial">Oficial</option>
                <option value="residente">Residente</option>
                <option value="noResidente">No Residente</option>
            </select>
            <br/>
            <h5>{this.state.message}</h5>
            <br/>
            <button onClick={this.Registrar} className='btn'>Registrar</button>
            <br/><br/>
            </div>
        </div>


        <div>
          <div>
            <h1>Marcar salida de vehiculo</h1>
          </div>
          <div>
            <text>Numero de Placa:   </text>
            <input type="text" label="Placa" id="placaSalida" required></input>
            <br/>
            <h5>{this.state.message2}</h5>
            <br/>
            <button onClick={this.Salida} className='btn'>Registrar</button>
            <br/>
          </div>
        </div>

        </div>

        <div>
          <div>
            <h1>Visualizar automoviles</h1>
          </div>
          <div>
            <text>Fecha:   </text>
            <input type="date" id="fecha" />
            <br/><br/>
            <text>Hora:   </text>
            <input type="time" id="hora"></input>
            <br/>
            <h5>{this.state.message3}</h5>
            <br/>
            <button onClick={this.Ver} className='btn'>Ver</button>
            <br/><br/><br/>
          </div>
        </div>

        <table class="table">

            <tr>
                <th>Núm. placa</th>
                <th>Tiempo estacionado (min.)</th>
                <th>Tipo</th>
                <th>Cantidad a pagar</th>
            </tr>

            {/* {this.state.array.map((dato, numero) => {
                return (
                <tr>
                    <td>{dato[0]}</td>
                    <td>{dato[1]}</td>
                    <td>{dato[2]}</td>
                    <td>{dato[3]}</td>
                </tr>
            )})} */}

            <tr>
                <td>AMD4</td>
                <td>30 min</td>
                <td>Oficial</td>
                <td>$200.00MX</td>
            </tr>
        </table>

      </div>
    );
  }
}

export default Inicio;