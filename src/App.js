import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from './components/ui/Header'; 
import { MediaView } from './components/media/MediaView'; 
import { DirectorView } from './components/director/DirectorView'; 
import { GeneroView } from './components/genero/GeneroView'; 
import { ProductoraView } from './components/productora/ProductoraView'; 
import { TipoView } from './components/tipo/TipoView'; 

function App() {
  return <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={MediaView} />
        <Route exact path='/directores' component={DirectorView} />
        <Route exact path='/generos' component={GeneroView} />
        <Route exact path='/productoras' component={ProductoraView} />
        <Route exact path='/tipos' component={TipoView} />
        
      </Switch>
    </Router>  
    }

export default App;