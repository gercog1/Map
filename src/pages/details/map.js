import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps"
import withStyles from 'isomorphic-style-loader/lib/withStyles'

//importing css
import s from './Details.scss';

if (typeof window === 'undefined') {
  global.window = {}
}
const google = window.google;

const MapDirections = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA7LkRUA2n1Uq25Dtf-6qaOWPfcrLapdSo&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div className={s.loadingElement} />,
    containerElement: <div className={s.containerElement} />,
    mapElement: <div className={s.mapElement} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: this.props.first,
        waypoints: this.props.waypoints,
        destination: this.props.second,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <div className={s.root}>
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
  </div>
);

export default withStyles(s)(MapDirections);
