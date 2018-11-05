import React from 'react';
import Events from './events/Events';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const App = () => {
    return (<Router>
        <div className="pokedex_container">
            <Switch>
                <Route exact path="/" component={Events}/>
            </Switch>
        </div>
    </Router>);
}

export default App;
