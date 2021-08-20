import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useLoader, useFrame } from 'react-three-fiber'


import earthImg from '../texture/earth.jpg'; 
import earthImg2 from '../texture/earth2.jpg'; 






  const SphereDay = () => {
    const texture = useLoader(THREE.TextureLoader, earthImg2)
    const ref = useRef()
    useFrame((state, delta) => (ref.current.rotation.y += 0.01))

    return (
      <mesh ref={ref}>

        <sphereBufferGeometry args={[2, 16, 16]} attach="geometry" />
        <meshBasicMaterial attach="material" map={texture} />

      </mesh>
    )
  }

  const SphereNight = () => {
    const texture = useLoader(THREE.TextureLoader, earthImg)
    const ref = useRef()
    useFrame((state, delta) => (ref.current.rotation.y += 0.01))

    return (
      <mesh ref={ref}>

        <sphereBufferGeometry args={[2, 16, 16]} attach="geometry" />
        <meshBasicMaterial attach="material" map={texture} />

      </mesh>
    )
  }

const TimeEarthView = (props) => {

    const [day, setDay] = useState(true); 

    const day_func = () => {
        setDay(prevcheck => !prevcheck); 
    }


    return (
        <div>
            <div className="container-timeEarthView">
                <div className="canvasEarthView">
                <Canvas>
                    <Suspense fallback={null}>
                    {!props.togglingView? (!day? <SphereDay/> : <SphereNight/>) : null}
                    
                    </Suspense>
                </Canvas>
                {!props.togglingView? <button onClick={day_func}>O</button> : null}
                </div>
            </div>
        </div>
    )
}



export default TimeEarthView; 