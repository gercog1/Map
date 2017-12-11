import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Row, Col} from 'reactstrap';

// importing data
import data from './data';

// importing components

// importing styles
import s from './travel.scss';

class Start extends Component {
  constructor(props){
    super(props);
    this.state = { routes: data.routes };

    this.findSum = this.findSum.bind(this);
    this.findTotalDays = this.findTotalDays.bind(this);
  }

  findSum = () =>{
    var sum = 0;
    for (let i = 0; i < this.state.routes[0].destinations.length; i++)
    {
      sum += this.state.routes[0].destinations[i].cost;
    }
    return (
      <h2>{ "Full cost: " + sum + " $" }</h2>
    )
  };

  findTotalDays = () =>{
    var sum = 0;
    for (let i = 0; i < this.state.routes[0].destinations.length; i++)
    {
      sum += this.state.routes[0].destinations[i].days;
    }
    return (
      <h2>{ "Total days: " + sum }</h2>
    )
  };

  render() {

    const { routes } = this.state;

    console.log(routes);

    return (
      <div className={s.root}>
        <Row>
          <Col md={12} xs={12}>
          <div className={s.travelBox} >
              <h1 className={s.travelH}>Travel</h1>
            <div className={s.countryBox}>
              {
                routes.map(destination => destination.destinations.map(( item, index )=>{
                  return (
                    <div className={s.route} key={ index }>
                      <h1 className={s.countryH}>{ item.country }</h1>
                      <img className={s.imgBox} src={item.imgUrl} alt=""/>
                    </div>
                  )

                }))
              }

            </div>
              <div className={s.commonInformation} >
                {
                  this.findSum()
                }
                {
                  this.findTotalDays()
                }
                <Link className={s.moreInf} to="/app/details">More inf</Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(s)(Start);
