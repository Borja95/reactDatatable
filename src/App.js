import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const tablaCampeones =[
  { año:"2000", campeon:"Real Madrid CF", subcampeon:"Valencia CF"},
  {año:"2001", campeon:"FC Bayern Munich", subcampeon:"Valencia CF"},
  { año:"2002", campeon:"Real Madrid CF", subcampeon:"Bayer 04 Leverkusen"},
  { año:"2003", campeon:"Milan AC", subcampeon:"Juventus FC"},
  { año:"2004", campeon:"FC Pórto", subcampeon:"AS Monaco"},
  { año:"2005", campeon:"Liverpool FC", subcampeon:"AC Milan"},
  { año:"2006", campeon:"FC Barcelona", subcampeon:"Arsenal FC"},
  { año:"2007", campeon:"Milan AC", subcampeon:"Liverpool FC"},
  { año:"2008", campeon:"Manchester United FC", subcampeon:"Chelsea FC"},
  { año:"2009", campeon:"FC Barcelona", subcampeon:"Manchester United FC"},
  { año:"2010", campeon:"FC Internazionale", subcampeon:"FC Bayern Munich"},
  { año:"2011", campeon:"FC Barcelona", subcampeon:"Manchester United FC"},
  { año:"2012", campeon:"Chelsea FC", subcampeon:"FC Bayern Munich"},
  { año:"2013", campeon:"FC Bayern Munich", subcampeon:"BV Borussia Dortmund"},
  { año:"2014", campeon:"Real Madrid CF", subcampeon:"Atletico de Madrid"},
  { año:"2015", campeon:"FC Barcelona", subcampeon:"Juventus FC"},
  { año:"2016", campeon:"Real Madrid CF", subcampeon:"Atletico de Madrid"},
  { año:"2017", campeon:"Real Madrid CF", subcampeon:"Juventus FC"},
  {año:"2018", campeon:"Real Madrid CF", subcampeon:"Liverpool FC"},
  { año:"2019", campeon:"Liverpool FC", subcampeon:"Tottenham Hotspur FC"},
];


const paginacionOpciones={
  rowsPerPageText: 'Filas por Página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
}

class App extends Component {
  state={
    busqueda: '',
    campeones: [],
    columnas:[]
  }

  onChange=async e=>{
    e.persist();
    await this.setState({busqueda: e.target.value});
    this.filtrarElementos();
  }

  asignarColumnas=()=>{

    const columnas = [
      {
        name: 'ID',
        selector: 'id',
        sortable: true
      },
      {
        name: 'Año',
        selector: 'año',
        sortable: true
      },
      {
        name: 'Campeón',
        selector: 'campeon',
        sortable: true,
        grow: 3
      },
      {
        name: 'Subcampeón',
        selector: 'subcampeon',
        sortable: true,
        right:true
      }
    ];

    this.setState({columnas: columnas});
  }

  filtrarElementos=()=>{
    var search=tablaCampeones.filter(item=>{
      if(item.año.toString().includes(this.state.busqueda) ||
      item.campeon.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(this.state.busqueda) ||
      item.subcampeon.toLowerCase().includes(this.state.busqueda)
      ){
        return item;
      }
    });
    this.setState({campeones: search});
  }

  crearIndex=()=>{
    var contador=1;
    tablaCampeones.map(elemento=>{
      elemento["id"]=contador;
      contador++;
    })
  }

  componentDidMount(){
    this.crearIndex();
    this.asignarColumnas();
this.setState({campeones: tablaCampeones});
  }
  
render(){
  return (
    <div className="table-responsive">
      <div className="barraBusqueda">
            <input
              type="text"
              placeholder="Buscar"
              className="textField"
              name="busqueda"
              value={this.state.busqueda}
              onChange={this.onChange}
            />
            <button type="button" className="btnBuscar" /*onClick={onClear}*/>
              {" "}
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
      <DataTable 
      columns={this.state.columnas}
      data={this.state.campeones}
      title="Campeones UCL 2000-2019"
      pagination
      paginationComponentOptions={paginacionOpciones}
      fixedHeader
      fixedHeaderScrollHeight="600px"
      noDataComponent={<span>No se encontró ningún elemento</span>}
      />
    </div>
  );
}
}
export default App;
