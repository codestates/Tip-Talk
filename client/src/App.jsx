import { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Coin } from './components/Coin';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import { darkTheme, GlobalStyle, lightTheme } from './styles/common';

const Container = styled.div`
  display: flex;
  height: 100%;
  min-height: 100vh;
  flex-direction: column;
`;

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkmode'));
  const [isLogin, setIsLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSingup] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Coin
        mode="light"
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        right="40px"
        bottom="150px"
      />
      <Router>
        <Container>
          <Header
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            showSignup={showSignup}
            setShowSignup={setShowSingup}
          />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/main">
              <Main />
              <Coin mode="reply" />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <Footer />
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
