import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { CandyMachineItem, Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js"
import { useEffect, useState } from "react"
import styles from "../styles/custom.module.css"

const FetchNft = () => {
  const [nftData, setNftData] = useState<CandyMachineItem[]>()

  const { connection } = useConnection()
  const wallet = useWallet()
  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet))

  // fetch nfts
  const fetchNfts = async () => {
    if (!wallet.connected || !wallet.publicKey ) {
      return
    }

    // fetch NFTs for connected wallet
    const nfts = await metaplex
      .nfts()
      .findAllByOwner({ owner: wallet.publicKey })
      .run()

    // fetch off chain metadata for each NFT
    let nftData: CandyMachineItem[] = []
    for (let i = 0; i < nfts.length; i++) {
      let fetchResult = await fetch(nfts[i].uri)
      let json = await fetchResult.json()
      nftData.push(json)
    }

    // set state
    setNftData(nftData)
  }

  // fetch nfts when connected wallet changes
  useEffect(() => {
    fetchNfts()
  }, [wallet])

  return (
    <div>
      {nftData && (
        <div className={styles.gridNFT}>
          {nftData.map((nft) => (
            <div>
              <ul>{nft.name}</ul>
              <img src={nft.uri} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FetchNft
