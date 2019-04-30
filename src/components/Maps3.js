import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { Component } from 'react'
import MapGL from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
 

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
 
class GeocoderMap extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 41.3851,
      longitude: 2.1734,
      zoom: 11
    }
  }
 
  mapRef = React.createRef()
 
  componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.resize()
  }
 
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }
 
  resize = () => {
    this.handleViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }
 
  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
    console.log(this.state.viewport)
  }
 
  handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 }
 
    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }
 
  render() {
    return (
      <MapGL
        ref={this.mapRef}
        {...this.state.viewport}
        onViewportChange={this.handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}>
        <Geocoder
          mapRef={this.mapRef}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      </MapGL>
    )
  }
}
 
export default GeocoderMap