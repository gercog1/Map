import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import s from './Profile.scss';
import axios from 'axios';
var LineChart = require("react-chartjs").Line;

class Profile extends React.Component {
  constructor(){
    super();
    this.state ={
      items: [],
      name: '',
      sname: '',
      isLoading: false,
      errorMessage: '',
      data: {},
      showChart: false

    };

    //bind functions
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeSName = this.handleChangeSName.bind(this);
  }

  handleChangeName(e){
    this.setState({name: e.target.value})
  }
  handleChangeSName(e){
    this.setState({sname: e.target.value})
  }

  downloadItems(){
    this.setState({isLoading: true});
    axios.get('http://rest.learncode.academy/api/flyerok/friends2')
      .then(response => { this.setState({items: response.data,
        isLoading: false,
        errorMessage: '',
       })})
      .catch(error =>{ this.setState({errorMessage: error.response.status,
        isLoading: false})})

  }

  componentWillMount(){
    this.downloadItems();

  }

  addItem(name, sname){
    if(name !== '' && sname !=='') {
      axios.post('http://rest.learncode.academy/api/flyerok/friends2', {
        firstName: name,
        lastName: sname
      })
      this.downloadItems();
      this.setState({
        name: '',
        sname: ''
      });
    }

  }

  updateItem(id, name, sname){
    if(name !== '' && sname !=='') {
      axios.put(`http://rest.learncode.academy/api/flyerok/friends2/${id}`, {
        firstName: name,
        lastName: sname
      })
      this.downloadItems();
      this.setState({
        name: '',
        sname: ''
      });
    }
  }

  deleteItem(id){
    axios.delete(`http://rest.learncode.academy/api/flyerok/friends2/${id}`);
    this.downloadItems();
  }

  createNotifications = () => {NotificationManager.success('Success message', 'SUCESS');}

  drawChart(){
    let a = this.state.items.map(item => { return item.firstName});
    let c = this.state.items.map(item => { return parseInt(item.lastName)});

    let data = {
      labels: a,
        datasets: [
      {
        label: "My First dataset",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "red",
        pointColor: "red",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: c
      }]
    }

      this.setState({data: data, showChart: true});
    }



  render() {

    const {items, name, sname, isLoading, errorMessage} = this.state;
    // console.log(items.map(item=>{return item.firstName}));
    // console.log(this.state.items.map(item =>{return parseInt(item.lastName)}));
    return (
      <div className={s.root}>
        <div> <button onClick={this.createNotifications} className={s.nextbtn1}>Notify success button</button> </div>
        <NotificationContainer/>
        <div >
          <input className={s.inputBox} onChange={this.handleChangeName} placeholder="Name" value={name} type="text"/>
          <input className={s.inputBox} onChange={this.handleChangeSName} placeholder="Surname" value={sname} type="text"/>
        </div>
        <div>
          {
            items.map((item, index)=>{
              return(
                <div className={s.items} key={index}>
                  <p>{item.firstName+" "+ item.lastName}
                    <span style={{cursor: 'pointer'}} onClick={isLoading ? null : ()=>this.deleteItem(item.id)} > &#10006; </span>
                    <span style={{cursor: 'pointer'}} onClick={isLoading ? null : ()=>this.updateItem(item.id, name, sname)}>&#9851;</span>
                  </p>
                </div>
              )
            })
          }
        </div>
        <div><button style={{cursor: 'pointer'}} className={s.nextbtn} onClick={isLoading ? null : ()=>this.addItem(name, sname)} >&#10010;</button></div>

        <div className={isLoading ? s.spinner : ''}>
          <div className={isLoading ? s.doubleBounce1 : ''}></div>
          <div className={isLoading ? s.doubleBounce2 : ''}></div>
        </div>

        <h1 className={s.error}>{errorMessage}</h1>

        { this.state.showChart ? <LineChart data={this.state.data} width="600" height="250"/> : ''}
        <button className={s.nextbtn} onClick={this.drawChart.bind(this)}>Draw</button>

      </div>
    );
  }
}
export default withStyles(s)(Profile);
