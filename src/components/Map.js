import React from 'react'
import GoogleMapReact from 'google-map-react';

function Map() {

  // function onClick(t) {
  // 	setData({ ...data, gpsPointX: t.lat, gpsPointY: t.lng })
  // 	setValue('gpsPointX', t.lat)
  // 	setValue('gpsPointY', t.lng)
  // }

  const Marker = props => {
    return <div lat='41.311081' lng='69.240562'> <div className='pin' /> <div className='pulse' /> </div>
  }


  return (
    <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyDRnmjaTmZQmjt4sxKaNVW_DqOfp993Afc" }}
      defaultZoom={13}
      yesIWantToUseGoogleMapApiInternals
      center={{ lat: '41.311081', lng: '69.240562' }}
    
    // onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
    >
      <Marker lat='41.311081' lng='69.240562' />
    </GoogleMapReact>
  )
}

export default Map