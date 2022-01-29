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
      array: [],
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
  
  Registrar() {

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

    if (minuto < 10) {
        minuto = "0"+minuto;
    }


    let fecha_completa = ""+year+"-"+mes+"-"+dia+"T"+hora+":"+minuto+":00.000Z";

    numero_placa = numero_placa.toUpperCase();

    var payload={
        "numero_placa": numero_placa,
        "tiempo_entrada": fecha_completa,
        "tiempo_salida": "",
        "tipo": tipo
    }


        axios.post('http://localhost:8000/estacionamiento', payload)
        .then((response) => {
          // console.log(response);
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

    Salida() {

        var numero_placa = document.getElementById("placaSalida").value;
        var hora_salida = document.getElementById("horaSalida").value;

        if (numero_placa === '' || hora_salida === ''){
            var message2 = "Completa todos los campos.";
            this.setState({message2:message2});
            setTimeout(this.Clean,3000);
        }else{

        let date = new Date()

        let dia = date.getDate()
        let mes = date.getMonth() + 1
        let year = date.getFullYear()

        if (mes < 10) {
            mes = "0"+mes;
        }

        let fecha_completa = ""+year+"-"+mes+"-"+dia+"T"+hora_salida+":00.000Z";
        numero_placa = numero_placa.toUpperCase();

        var payload={
            "numero_placa": numero_placa,
            "tiempo_salida": fecha_completa
        }
    
    
            axios.put('http://localhost:8000/estacionamiento', payload)
            .then((response) => {
              // console.log(response);
                if(response.status === 200){
    
                    var message2 = "Guardado correctamente.";
                    this.setState({message2:message2});
                    setTimeout(this.Reload,3000);
    
                }
            })
    
            .catch((error) => {
                console.log(error);
                var message2 = "No se reconoce la placa.";
                this.setState({message2:message2});
                setTimeout(this.Clean,3000);
            });
        }
    }

    Ver() {

        var fecha = document.getElementById("fecha").value;
        var hora = document.getElementById("hora").value;

        var horaSegmentada = hora.split(":");

        if (fecha === '' || hora === ''){
            var message3 = "Completa todos los campos.";
            this.setState({message3:message3});
            setTimeout(this.Clean,3000);
        }else{
        
        let tiempo_entrada = ""+fecha+"T"+horaSegmentada[0];

    
            axios.get('http://localhost:8000/estacionamiento/'+tiempo_entrada)
            .then((response) => {
                // console.log(response);
                if(response.status === 200){
    
                    var array = []

                    if (response.data.numero_placas.length === 0) {
                        array.push(["Sin registro","Sin registro","Sin registro","Sin registro"]);
                    }else{

                      for (const key in response.data.numero_placas) {
                        const element = response.data; 

                        array.push([element.numero_placas[key],element.tiempo_estacionados[key],element.tipos[key],element.cantidades_a_pagar[key]])
                      }

                    }

                    this.setState({
                    array: array,
                    })
    
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
            <br/><br/>
            <text>Hora de Salida:   </text>
            <input type="time" id="horaSalida"></input>
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
            <br/><br/>
          </div>
        </div>

        <table class="table">

            <tr>
                <th>Núm. placa</th>
                <th>Tiempo estacionado (min.)</th>
                <th>Tipo</th>
                <th>Cantidad a pagar</th>
            </tr>


              {this.state.array.map((dato, numero) => {

                if (dato[2] === "noResidente") {
                  dato[2] = "No Residente";
                }else if(dato[2] === "residente"){
                  dato[2] = "Residente";
                }else if (dato[2] === "oficial") {
                  dato[2] = "Oficial";
                }

                if (dato[3] !== "Sin registro") {
                  dato[3] = "$ "+dato[3]+".00MX";
                }

                  return (
                    <tr>
                      <td>
                        <tr>{dato[0]}</tr>
                      </td>
                      <td>
                        <tr>{dato[1]}</tr>
                      </td>
                      <td>
                        <tr>{dato[2]}</tr>
                      </td>
                      <td>
                        <tr>{dato[3]}</tr>
                      </td>
                    </tr>
              )})}

        </table>
        <br/><br/>
      </div>
    );
  }
}

export default Inicio;