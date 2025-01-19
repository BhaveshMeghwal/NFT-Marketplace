import './App.css';
import { ethers } from 'ethers';
import { useState } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import MarketplaceAbi from "../artifacts/contracts/Marketplace.sol/Marketplace.json"
import { MarketplaceAbi, NFTAbi, NFTAddress, MarketplaceAddress } from './constants/Constants';
import Navbar from './components/Navbar';
import { Home } from './Pages/Home';
import { CreateNFT } from './Pages/CreateNFT';
import ListedItems  from './Pages/ListedItems';
import Purchase from './Pages/Purchase';



function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})
  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // console.log(accounts)
    setAccount(accounts[0])
    // Get provider from Metamask
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    const provider = new ethers.BrowserProvider(window.ethereum)
    // Set signer
    // console.log(provider.getSigner)
    const signer = provider.getSigner()

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[1])
      await web3Handler()
    })
    loadContracts(signer)
  }
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(MarketplaceAddress, MarketplaceAbi, signer)
    // console.log(marketplace)
    setMarketplace(marketplace)
    const nft = new ethers.Contract(NFTAddress, NFTAbi, signer)
    setNFT(nft)
    setLoading(false)
  }
  return (
    <div className="App">
      <Router>
        <Navbar web3Handler={web3Handler} account={account} />

        <Routes>

          <Route path="/" element={
            <Home marketplace={marketplace} nft={nft} />
          } />
          <Route path="/create" element={
            <CreateNFT marketplace={marketplace} nft={nft} />
          } />
          <Route path="/listed-items" element={
            <ListedItems marketplace={marketplace} nft={nft} account={account} />
          } />
          <Route path="/my-purchases" element={
            <Purchase marketplace={marketplace} nft={nft} account={account} />
          } />
        </Routes>
        {/* </Navbar> */}
      </Router>
    </div>
  );
}

export default App;
