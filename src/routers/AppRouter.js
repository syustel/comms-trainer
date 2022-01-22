import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import { CommsConfig } from '../components/CommsConfig';

  import { CommsTrainer } from '../components/CommsTrainer';
import { Config } from '../components/Config';
import { CubeLayout } from '../components/CubeLayout';
import { ExportConfig } from '../components/ExportConfig';
import { Home } from '../components/Home';
import { ImportConfig } from '../components/ImportConfig';
import { Sidebar } from '../components/Sidebar';
import { Test } from '../components/Test';
import { Train } from '../components/Train';

export const AppRouter = () => {
  
    return (
        <Router>
            <div className="d-flex">
                <Sidebar />

                <div className="main-div">
                    <Switch>
                        <Route path="/train/edge_comms">
                            <CommsTrainer pieceType={'edge'} />
                        </Route>

                        <Route path="/train/corner_comms">
                            <CommsTrainer pieceType={'corner'} />
                        </Route>

                        <Route path="/train">
                            <Train />
                        </Route>
                        
                        <Route path="/config/letter_scheme">
                            <CubeLayout />
                        </Route>

                        <Route path="/config/edge_comms">
                            <CommsConfig pieceType={'edge'} />
                        </Route>

                        <Route path="/config/corner_comms">
                            <CommsConfig pieceType={'corner'} />
                        </Route>

                        <Route path="/config/export_config">
                            <ExportConfig />
                        </Route>

                        <Route path="/config/import_config">
                            <ImportConfig />
                        </Route>

                        <Route path="/config">
                            <Config />
                        </Route>

                        <Route path="/test">
                            <Test />
                        </Route>

                        <Route path="/">
                            <Home />
                        </Route>
                        
                    </Switch>
                </div>
            </div>
        </Router>
    )
}
