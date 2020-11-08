import React, {Component} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import offerProptypes from './offer-proptypes';

class Map extends Component {
  constructor(props) {
    super(props);
  }

  _displayMapMarkers(map) {
    const {offers} = this.props;

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const offerCords = [52.3709553943508, 4.89309666406198];
    leaflet
            .marker(offerCords, {icon})
            .addTo(map);

    offers.map((offer) => {
      leaflet
            .marker(offer.coordinates, {icon})
            .addTo(map);
    });
  }

  _displayMap() {
    const city = [52.38333, 4.9];

    const zoom = 12;
    const map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoom);

    leaflet
            .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
              attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
            })
        .addTo(map);

    this._displayMapMarkers(map);
  }

  componentDidMount() {
    this._displayMap();
  }

  render() {
    return <div id="map" style={{height: `100%`}}></div>;
  }
}

Map.propTypes = {offers: PropTypes.arrayOf(offerProptypes)};

export default Map;