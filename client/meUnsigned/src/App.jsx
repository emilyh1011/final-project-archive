import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, useLocation} from 'react-router-dom'

//Import our page components
import Header from './Header';
import Home from '../pages/Home'
import Signed from '../pages/Signed'
import Submit from '../pages/Submit'
import LetterDetails from '../pages/LetterDetails'

//Define our routes in App.jsx so works throughout app, and 
//place our header in App.jsx so it appears in all pages

function App() {
  const currentLocation = useLocation();
  const {pathname} = currentLocation; //destructure built in pathname object from useLocation
  console.log("we are on path: ", pathname);

  return (
    <>
      {/* We want to allow overflow only on the signed page, so users can continuously scroll for letters.
      Use useLocation to check if we are on the /signed path
      Change both containers height to min-h-screen(originally:overflow for /signed, problem of black screen not adjusting and instead excess white all around)
      min-h-screen allows both white rectangle in middle and black background to adjust for overscroll, so height becomes larger than h-screen) */}
      <div className={`flex justify-center max-w-screen bg-gray-800 min-h-screen ${pathname == "/signed" ? '': 'overflow-hidden' }`}>
        <div className="flex-col w-full max-w-lg bg-white min-h-screen z-3">

          <Header/>

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/signed" element={<Signed />}></Route>
            <Route path="/submit" element={<Submit />}></Route>
            <Route path= "/letter-details/:id" element={<LetterDetails />}></Route>
          </Routes>

          

        </div>
      </div>

    </>
  )
}

export default App
