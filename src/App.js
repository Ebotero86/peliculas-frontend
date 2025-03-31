import React from "react";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { Header } from './components/ui/Header'; 
import { MediaView } from './components/media/MediaView'; 
import { DirectorView } from './components/director/DirectorView';
import { GeneroView } from './components/genero/GeneroView'; 
import { ProductoraView } from './components/productora/ProductoraView'; 
import { TipoView } from './components/tipo/TipoView'; 
import { MediaUpdate } from "./components/media/MediaUpdate";

function App() {
  return <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={MediaView} />
        <Route exact path="/director" component={DirectorView} />
        <Route exact path="/genero" component={GeneroView} />
        <Route exact path="/media" component={MediaView} />
        <Route exact path="/productora" component={ProductoraView} />
        <Route exact path="/tipo" component={TipoView} />
        <Route exact path="/media/edit/:mediaid" component = {MediaUpdate}></Route>        
      </Switch>
    </Router>  
}

export default App;
