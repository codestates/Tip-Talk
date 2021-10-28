import { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Coin } from './components/Coin';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Post from './pages/Post';
import UploadPost from './pages/UploadPost';
import { darkTheme, GlobalStyle, lightTheme } from './styles/common';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  height: 100%;
  min-height: 100vh;
  flex-direction: column;
`;

export const { kakao } = window;

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkmode'));
  const [user, setUser] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSingup] = useState(false);

  useEffect(() => {
    const fragmentString = window.location.hash.substring(1);
    // Parse query string to see if page request is coming from OAuth 2.0 server.
    const params = {};
    let regex = /([^&=]+)=([^&]*)/g,
      m;
    while ((m = regex.exec(fragmentString))) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    if (Object.keys(params).length > 0) {
      localStorage.setItem('tiptalk-oauth2', JSON.stringify(params));
      if (params['state'] && params['state'] === 'tiptalk') {
        const params = JSON.parse(localStorage.getItem('tiptalk-oauth2'));
        if (params && params['access_token']) {
          const accessToken = params['access_token'];
          axios
            .post(
              'http://localhost:8080/oauth/google',
              { accessToken },
              { withCredentials: true },
            )
            .then((res) => {
              if (res.data) {
                setUser(res.data);
              }
            });
        }
      }
    }
  }, []);

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
            user={user}
            setUser={setUser}
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
            <Route path="/post/:postId">
              <Post />
              <Coin mode="reply" />
            </Route>
            <Route path="/upload">
              <UploadPost />
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
