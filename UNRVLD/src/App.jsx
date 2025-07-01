import Header from "./components/Header/Header.jsx"
import Carousel from "./components/Carousel/Carousel.jsx"
import Grid from "./components/Grid/Grid.jsx"
import './assets/scss/grid-layout.scss'
import './assets/scss/fonts.scss'
import './App.scss'


function App() {

  return (
    <>
      <Header>
        <h1>Front-end Dev Test</h1>
      </Header>
      <Carousel />
      <Grid />
    </>
  )
}

export default App
