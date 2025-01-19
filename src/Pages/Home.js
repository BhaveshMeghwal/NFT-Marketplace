import React from 'react'
import sample from '../assets/vid.mp4';
import nftImg from "../assets/nft.png"
import "../styles/Home.css"

export const Home = () => {
  return (
    <>
      {/* <video className='videoTag' autoPlay loop muted>
        <source src={sample} type='video/mp4' />

      </video> */}
      <div className='home'>
        {/* <img src={nftImg}/> */}
        <div className='heading'>
          <h1 >New <span className='text-grad'>NFTS</span> are here.</h1>
          <p>Buy, sell, and discover unique digital assets in our secure NFT marketplace. Join the future of digital art today!</p>
          <button className='button-1'>Connect Wallet</button>
        </div>
      </div>

      <div className='circle circle-1'></div>
      <div className='circle circle-2'></div>
    </>
  )
}
