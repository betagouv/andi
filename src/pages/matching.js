import Layout from "../components/layout"

import React, { Component } from "react"
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const default_position = [49.0615, 2.1581]
const default_zoom = 13

class MyMap extends Component {
  constructor(props) {
      super(props);
      console.log(props)
      this.options = props

  }
  render() {
    if (typeof window !== 'undefined') {
      console.log(this.options)
      return (
        <Map id="map_object" {...this.options}>
          {/* Map code goes here */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position= { this.options.center }>
              <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
            </Marker>
        </Map>
      )
    }
    return null
  }
}

const FormElement = ({name, text, onclick}) => (
    <div className="form__group">
      <label htmlFor={ name }>{ text }</label>
      <input name={ name } id={ name } type="text" required onClick={ onclick }/>
    </div>
)


const MapPage = () => (
  <Layout>
    <section>
        <div className="container-fluid">
            <div className="row">
            <div className="col">
              <h1>Andi Matching</h1>
              <p>Recherche</p>
              <FormElement name="address" text="Adresse" onclick={ console.log } />
              <FormElement name="sector" text="Activité" onclick={ console.log } />
            </div>
            <div className="col">
              <p>Travail en cours / état expérimental</p>
            </div>
          </div>
        </div>
        <p></p>
        <div className="row">
          <div className="container-fluid">
            <MyMap center={ default_position } zoom={ default_zoom } />
          </div>
        </div>
        <div className="row">
          <div className="container-fluid">
            <p></p>
          </div>
        </div>
    </section>
  </Layout>
)


export default MapPage
