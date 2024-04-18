import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import CoinFlip from './CoinFlip';
import Limbo from './Limbo';
import RegisterPopup from './RegisterPopup';
import LoginPopup from './LoginPopup';
import Footer from './Footer';
import Crash from './Crash';


function App() {


  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [currentGame, setCurrentGame] = useState('CoinFlip');

  const toggleBurgerMenu = () => {
    setBurgerMenuOpen(!burgerMenuOpen);
  };


  let gameComponent;
  if (currentGame === 'CoinFlip') {
    gameComponent = <CoinFlip loggedInUser={loggedInUser} />;
  } else if (currentGame === 'Limbo') {
    gameComponent = <Limbo loggedInUser={loggedInUser} />;
  } else if (currentGame === 'Crash') {
    gameComponent = <Crash loggedInUser={loggedInUser} />;
  }



  const handleLogin = async (username) => {
    try {
      const response = await fetch(`https://casinoof-ef63d3b0481e.herokuapp.com/api/users/getBalance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      if (data.success) {
        setLoggedInUser(username);
        setBalance(data.balance);
        console.log('Saldo atualizado para:', data.balance);
      } else {
        console.error('Erro ao obter saldo:', data.message);
      }
    } catch (error) {
      console.error('Erro na chamada da API:', error);
    }
  };


  return (
    <div className="App">
      <Header
        setBalance={setBalance}
        balance={balance}
        onRegisterClick={() => setShowRegister(true)}
        onLoginClick={() => setShowLogin(true)}
        loggedInUser={loggedInUser}
        onLogout={() => setLoggedInUser(null)}
        currentGame={currentGame}
        onGameChange={(game) => setCurrentGame(game)}
        isBurgerMenuOpen={burgerMenuOpen}
        onToggleBurgerMenu={toggleBurgerMenu}
      />
      {gameComponent}
      {showRegister && <RegisterPopup onClose={() => setShowRegister(false)} onUserRegister={setLoggedInUser} />}
      {showLogin && <LoginPopup onClose={() => setShowLogin(false)} onUserLogin={handleLogin} />}
      <Footer />
      <div id="screen-size-warning">
        Tamanho da tela não é suportado.
      </div>
    </div>

  );
}

export default App;






