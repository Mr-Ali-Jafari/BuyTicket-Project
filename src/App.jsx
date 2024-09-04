// css
import './App.css'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// router
import { useRoutes } from 'react-router-dom'
import routes from './router'

// components
import Header from './Components/Header/Header'

// context
import {HeaderProvider} from './Context/header'

function App() {
  let router = useRoutes(routes)
  return (
    <>
      <HeaderProvider>
        <Header />
      </HeaderProvider>
      {router}
    </>
  )
}

export default App
