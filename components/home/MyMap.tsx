import { useEffect, useRef } from 'react'
import MapboxMap from 'react-map-gl'

interface MyMapProps {
  zoom: number
}

const MyMap = (props: MyMapProps) => {
  const { zoom } = props

  const mapRef = useRef<any>(null)

  useEffect(() => {
    console.log()
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [-122.273, 37.8715],
        zoom,
      })
    }
  }, [zoom])

  return (
    <MapboxMap
      boxZoom={false}
      cursor="default"
      doubleClickZoom={false}
      dragPan={false}
      dragRotate={false}
      initialViewState={{
        longitude: -122.273,
        latitude: 37.8715,
        zoom,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken="pk.eyJ1IjoiZG90bHkiLCJhIjoiY2tpbnA0YjljMTVhcTM0cGVzYjZibzEyMSJ9.fmuvKLVnmue6RxfqZjeLPQ"
      ref={mapRef}
      scrollZoom={false}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '6px',
      }}
    />
  )
}

export default MyMap
