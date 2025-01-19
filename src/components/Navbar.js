// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'

const Navbar = ({web3Handler, account}) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
        <span className='text-gradf'>Etherium Exchange</span>
          
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-links">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/marketplace" className="navbar-links">
              Marketplace
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="navbar-links">
              Create NFT
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/listed-items" className="navbar-links">
              My NFTs
            </Link>
          </li>
        </ul>

        <div>
                        {account ? (
                            <div
                                href={`https://etherscan.io/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">
                                <button variant="outline-light">
                                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                </button>

                            </div>
                        ) : (
                            <button onClick={web3Handler} variant="outline-light">Connect Wallet</button>
                        )}
                    </div>
      </div>
    </nav>
  );
};

export default Navbar;
