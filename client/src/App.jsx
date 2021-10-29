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
import MyPage from './pages/MyPage';
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
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSingup] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');

    if (authorizationCode) {
      axios
        .post('http://localhost:8000/oauth/google', {
          authorizationCode,
        })
        .then(({ data }) => {
          // ToDo 로컬스토리지에 토큰 저장하기
          const { token } = data;
          localStorage.setItem('token', token);
        })
        .catch(console.log);
    }
  }, []);

  useEffect(() => {
    const info = localStorage.getItem('token');
    if (info) {
      setUser(info);
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
            <Route path="/mypage">
              <MyPage />
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
