import React from 'react';
// import 'bootswatch/dist/materia/bootstrap.min.css';
import './App.css';
import history from './history';
import TheBoard from './TheBoard/TheBoard';
import AddFriend from './Friends/AddFriend';
import FriendsList from './Friends/FriendsList'
import MyBets from './MyBets/MyBets'
import BottomNavBar from './BottomNavBar/BottomNavBar';
import { Route, Switch, HashRouter as Router } from 'react-router-dom'
// import { Router } from "react-router";

import NotFound from './Views/NotFound';
import Lotto from './Lotto/Lotto';
import Start from './TicTac/components/pages/Start';
import Board from './TicTac/components/pages/Board';

import Login from './Views/Login';
import Register from './Views/Register';
import PrivateRoute from './Components/Common/Auth/PrivateRoute';
import PublicRoute from './Components/Common/Auth/PublicRoute'
import UserPage from './Views/UserPage';
import ProfileUpdate from './Views/ProfileUpdate';
import DepotWallet from './Views/DepotWallet';
import RetraitWallet from './Views/RetraitWallet';
import { ToastProvider } from 'react-toast-notifications';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes/theme';
import { GlobalStyles } from './themes/global';
import { useDarkMode } from './themes/useDarkMode';
import { getToken } from './Components/Common/Auth/Sessions'

const App = () => {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const token = getToken()

  return (
    <ThemeProvider theme={themeMode}>
      <ToastProvider>
        <Router history={history}>
          <GlobalStyles />          
          <Switch>
            <PrivateRoute exact path="/" component={TheBoard} />
              <PrivateRoute
                exact
                path="/friends"
                component={FriendsList}
              />
              <PrivateRoute
                exact
                path="/friends/add"
                history={history}
                component={AddFriend}
              />
              <PrivateRoute
                exact
                path='/mybets'
                component={MyBets}
              />
            <PrivateRoute exact path="/lotto" component={Lotto} />
            <PrivateRoute exact path="/live/tictac" component={Start} />
            <PrivateRoute exact path="/live/tictac/game" component={Board} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/register" component={Register} />
            <PrivateRoute path="/profile" component={UserPage} />
            <PrivateRoute path="/profile-edite/" component={ProfileUpdate} />
            <PrivateRoute path="/depot/moncash/" component={DepotWallet} />
            <PrivateRoute path="/retrait/moncash/" component={RetraitWallet} />
            <Route component={NotFound} />
          </Switch>
          {token? 
            <BottomNavBar />
            :
            ''}

        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
