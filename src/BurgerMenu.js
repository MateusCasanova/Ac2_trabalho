import React from 'react';
import './BurgerMenu.css';
import { FaChessRook } from 'react-icons/fa6';
import { PiCoinsFill } from 'react-icons/pi';
import { BsFillRocketFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai'; 



const BurgerMenu = ({ isOpen, onClose, onGameChange }) => {
    const handleGameChange = (game) => {
        if (game === 'CoinFlip') {
            onGameChange(game);
        } else {
            alert("Este jogo está atualmente bloqueado.");
        }
    };

    return (
        <div className={`burger-menu ${isOpen ? 'open' : 'minimized'}`}>
            <button className="burger-menu-close" onClick={onClose}><AiOutlineClose /></button>
            <div className='original'>ORIGINAIS BETPIX</div>
            <ul>
                <li className="nav-link stylish-text" onClick={() => handleGameChange('Crash')}><BsFillRocketFill/> Crash</li>
                <li className="nav-link stylish-text" onClick={() => handleGameChange('Limbo')}><FaChessRook/> Limbo</li>
                <li className="nav-link stylish-text" onClick={() => handleGameChange('CoinFlip')}><PiCoinsFill/> CoinFlip</li>
            </ul>
        </div>
    );
};

export default BurgerMenu;

