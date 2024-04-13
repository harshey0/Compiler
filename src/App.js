import React, { Component } from 'react'
import "./App.css"
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Home from "./pages/Home"
import EditorPage from "./pages/EditorPage"


export default class App extends Component {
  render() {
    return (
      <>
      <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Home />}/>
        <Route path ="/editor" element={<EditorPage />}/>
      </Routes>
      </BrowserRouter>
      </>
    )
  }
}
