import React, { useState } from 'react'
import { ethers } from "ethers"
import { create as ipfsHttpClient } from 'ipfs-http-client'

import { PinataSDK } from "pinata";

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export const CreateNFT = () => {
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const pinata = new PinataSDK({
    pinataJwt: process.env.JWT,
    pinataGateway: "https://lavender-wrong-fly-36.mypinata.cloud",
  });

  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
        const result = await pinata.upload.file(file);
        console.log(result)
        setImage(result)
      } catch (error) {
        console.log("ipfs image upload error: ", error)
      }
    }
  }

  const create = async () => {
    if (!image || !price || !name || !description) return
    try {
      const result = await pinata.upload.json( {image, price, name, description} )
      console.log(result.cid)
      mintThenList(result)
    } catch (error) {
      console.log("ipfs uri upload error: ", error)
    }
  }

    const mintThenList = async (result) => {
    // const uri = `https://ipfs.infura.io/ipfs/${result.path}`
    const uri = await pinata.gateways.get(`${result.cid}`)
    console.log(uri)



    // mint nft 
    // await(await nft.mint(uri)).wait()
    // // // get tokenId of new nft 
    // const id = await nft.tokenCount()
    // // // approve marketplace to spend nft
    // await(await nft.setApprovalForAll(marketplace.address, true)).wait()
    // // // add nft to marketplace
    // const listingPrice = ethers.parseEther(price.toString())
    // await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
  }





  // const uploadToIPFS = async (event) => {
  //   event.preventDefault()
  //   const file = event.target.files[0]
  //   // if (typeof file !== 'undefined') {
  //     try {
  //       const result = await client.add({content:file})
  //       console.log(result)
  //       // setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
  //     } catch (error){
  //       console.log("ipfs image upload error: ", error)
  //     }
  //   // }
  // }



  // const create = async () => {
  //   if (!image || !price || !name || !description) return
  //   try {
  //     const result = await client.add(JSON.stringify({ image, price, name, description }))
  //     console.log(result)
  //     // mintThenList(result)
  //   } catch (error) {
  //     console.log("ipfs uri upload error: ", error)
  //   }
  // }

  // const mintThenList = async (result) => {
  //   const uri = `https://ipfs.infura.io/ipfs/${result.path}`
  //   // mint nft 
  //   await(await nft.mint(uri)).wait()
  //   // get tokenId of new nft 
  //   const id = await nft.tokenCount()
  //   // approve marketplace to spend nft
  //   await(await nft.setApprovalForAll(marketplace.address, true)).wait()
  //   // add nft to marketplace
  //   const listingPrice = ethers.parseEther(price.toString())
  //   await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
  // }
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <div className="g-4">
              <input
                type="file"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              <input onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
              <input onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
              <input onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
              <div className="d-grid px-0">
                <button onClick={create}  variant="primary" size="lg">
                  Create & List NFT!
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
