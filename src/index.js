import React from "react"
import {createRoot} from "react-dom/client"
import App from "./App"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Header from "./components/header/header"
import Footer from "./components/footer/footer"
import Unescape from "./components/unescape/unescape"

import "./index.css"
import "./assets/css/blobz.css"

const domNode = document.getElementById("root")
const root = createRoot(domNode)

root.render(
  <React.StrictMode>
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/unescape" element={<Unescape/>} />
          <Route path="*" element={<App/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  </React.StrictMode>
)