import { useState, useEffect, useContext } from 'react';
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
import Loading from './components/Loading';
import UserContext from './context/UserContext';

const Container = styled.div`
  display: flex;
  height: 100%;
  min-height: 100vh;
  flex-direction: column;
`;

export const { kakao } = window;

axios.defaults.withCredentials = true;

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkmode'));
  const [user, setUser] = useContext(UserContext);
  const [token, setToken] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSingup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');

    if (authorizationCode) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/oauth/google`, {
          authorizationCode,
        })
        .then(({ data }) => {
          if (data.status) {
            const { token, user } = data.data;
            setUser(user);
            setToken(token);
            localStorage.setItem('token', token);
          }
        })
        .catch((res) => {});
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
        bottom="60px"
      />
      <Router>
        <Container>
          <Header
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            showSignup={showSignup}
            setShowSignup={setShowSingup}
            token={token}
            setToken={setToken}
          />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/main">
              <Main />
              <Coin mode="reply" />
              <Footer />
            </Route>
            <Route path="/post/:postId">
              <Post />
              <Coin mode="reply" />
              <Footer />
            </Route>
            <Route path="/upload">
              <UploadPost />
              <Coin mode="reply" />
              <Footer />
            </Route>
            <Route path="/mypage/:id">
              <MyPage setToken={setToken} />
              <Footer />
            </Route>
            <Route path="/loading">
              <Loading />
            </Route>
            <Route>
              <NotFound />
              <Footer />
            </Route>
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
