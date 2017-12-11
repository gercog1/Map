// importing packages
import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Row, Col} from 'reactstrap';

// importing data
import data from './data';

// importing components
import Map from './map';


// importing styles
import s from './Details.scss';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { routes: data.routes,
      origin: "",
      destination: "",
      cities: []
    };
    this.getCities = this.getCities.bind(this);
  }

  componentWillMount(){
    this.getCities();
    this.setState({
      origin: this.state.routes[0].destinations[0].city,
      destination: this.state.routes[0].destinations[this.state.routes[0].destinations.length -1].city
    });
  }

  getCities(){
    var array = [];
    for ( let i = 1; i < this.state.routes[0].destinations.length - 1; i++) {
      let elem = {
        location: this.state.routes[0].destinations[i].city,
        stopover: true,
      };
      array.push(elem);
    }

    this.setState({cities: array})

  }


  render() {

    const {routes, cities, origin, destination} = this.state;



    return (
      <div className={s.root}>
        <Row>
          <Col md={4} xs={12}>
            {
              routes.map(destination => destination.destinations.map((item,index)=>{
                return (

                  <div className={s.rout} key={index}>
                    <img src={item.imgUrl} className={s.countryImg} alt=""/>
                    <div className={s.infBox}>
                      <h1 className={s.countryH1}>{item.city}</h1>
                      <h1 className={s.costH1}>{item.cost + " $"}</h1>
                      <h2 className={s.cityH1}>{item.country}</h2>
                      <h4 className={s.dayH1}>{"Days: " + item.days}</h4>
                    </div>
                  </div>
                )

              }))
            }
          </Col>

          <Col md={8} xs={12}>
            <div className={s.mapRoutes} >
              <h1 className={s.hMap}>Map of route: </h1>
              <div className={s.mapPosition}>
               <Map first={origin} waypoints={cities} second={destination}/>
              </div>
            </div>
          </Col>
        </Row>


      </div>

    );
  }
}

export default withStyles(s)(Details);
