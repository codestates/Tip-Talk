import { useState } from 'react';
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

const Container = styled.div`
  display: flex;
  height: 100%;
  min-height: 100vh;
  flex-direction: column;
`;

export const { kakao } = window;

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkmode'));
  const [isLogin, setIsLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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
