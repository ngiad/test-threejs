import React, { useRef, useState } from "react"

import './App.scss';

import { Canvas, useFrame } from "react-three-fiber";

import GoogleLogin from 'react-google-login'

// import { softShadows, MeshobbleMaterial } from "drei";

// softShadows()
const SpinningMesh = ({ position, args, color }) => {
  const mesh = useRef(null)
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  return (
    <mesh castShadow position={position} ref={mesh}>
      <boxBufferGeometry attach='geometry' args={args} />
      <meshStandardMaterial attach='material' color={color} speed={1} factor={0.6} />
      {/* MeshobbleMaterial */}
      {/* meshStandardMaterial */}
    </mesh>
  )
}

// const CSpinningMesh = ({ position, args, color }) => {
//   const mesh = useRef(null)
//   useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.02))

//   return (
//     <mesh castShadow position={position} ref={mesh}>
//       <circleBufferGeometry attach='geometry' args={args} />
//       <meshStandardMaterial attach='material' color={color} speed={1} factor={0.6} />
//       {/* MeshobbleMaterial */}
//       {/* meshStandardMaterial */}
//     </mesh>
//   )
// }

function App() {
  // xử lí đăng nhập google
  const [LoginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  )
  const handleFailure = (result) => {
    console.log(result)
  }
  // xử lí đăng nhập thành công
  const handleLogin = async (googleData) => {
    console.log(googleData)
    try {
      const res = await fetch('/api/google-login', {
        method: 'POST',
        body: JSON.stringify({
          token: googleData.tokenId,
        }),
        headers: {
          'Content-Tyoe': 'appLication/json'
        }
      })

      const data = await res.json()
      setLoginData(data)
    } catch (error) {
      alert(error)
    }
  }
  //  xử lí đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('loginData')
    setLoginData(null)
  }
  return (
    <div className="main">
      <div className="content-left">
        <div className="title">
          <h1>Quiz Game</h1>
          <p>Brief Design is the Best</p>
        </div>
        <div className="p-title">
          <h4>"</h4>
          Those people who develop the ability
          to continuously acquire new and better
          forms of knowledge that they can apply
          to their work and to their lives will be
          the movers
          and shakers in our
          society for the indefinite future
          <br />
          <h4>"</h4>
        </div>
        <div className="logo">
          <Canvas colorManagement camera={{ position: [-5, 2, 10], fov: 60 }}>
            <ambientLight intensity={0.7} />
            <directionalLight
              castShadow
              position={[0, 10, 0]}
              intensity={1.5}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={-10}
              shadow-camera-top={-10}
              shadow-camera-bottom={-10}
            />
            <pointLight position={[-10, 0, -20]} intensity={0.5} />
            <pointLight position={[0, -10, 0]} intensity={1.5} />

            <group>
              <mesh
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -3, 0]}>
                <planeBufferGeometry attach='geometry' args={[100, 100]} />
                <shadowMaterial attach='material' opacity={0.3} />
              </mesh>
            </group>

            {/* <CSpinningMesh position={[0, 3, 0]} args={[3, 30]} color='#3f4bc1' /> */}
            <SpinningMesh position={[0, 1, 0]} args={[3, 2, 1]} color='Lightblue' />
            <SpinningMesh position={[-2, 1, -5]} color='#FF69B4' />
            <SpinningMesh position={[5, 1, -2]} color='#9932CC' />
            <SpinningMesh position={[5, 1, -2]} color='#DC143C' />
            <SpinningMesh position={[1, 3, 3]} color='#FFFF00' />
            <SpinningMesh position={[-2, -1, -1]} color='#00FA9A' />
            <SpinningMesh position={[-0, 2, -4]} color='pink' />
            <SpinningMesh position={[2, -1, -2]} color='pink' />
            {/* <SpinningMesh position={[-3, 1, -1]} color='pink' /> */}
            {/* <SpinningMesh position={[-0, 2, -4]} color='pink' />
            <SpinningMesh position={[2, -1, -2]} color='pink' /> */}
          </Canvas>
        </div>
      </div>
      <div className="content-right">
        <h2>Login to your Account</h2>
        <p>with your registered Email Address</p>
        {/* <form>
          <label for="#name">Tên Tài Khoản</label><br></br>
          <input type='text' id="name" /><br />
          <label for="pass">Mật Khẩu</label><br></br>
          <input type='text' value='pass' />
        </form> */}
        {
          LoginData ? (
            <div>
              <h3>You logged in as {LoginData.email}</h3>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )
            : (
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIEBT_ID}
                buttonText='log in with Google'
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
              >

              </GoogleLogin>
            )
        }

      </div>
    </div>
  );
}


export default App;
