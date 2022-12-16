import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
	CandyMachineItem,
	Metaplex,
	walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { useEffect, useState } from "react";
import { Flex, Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";

const FetchNft = () => {
	const [nftData, setNftData] = useState<CandyMachineItem[]>();

	const { connection } = useConnection();
	const wallet = useWallet();
	const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

	// fetch nfts
	const fetchNfts = async () => {
		if (!wallet.connected || !wallet.publicKey) {
			return;
		}

		// fetch NFTs for connected wallet
		const nfts = await metaplex
			.nfts()
			.findAllByOwner({ owner: wallet.publicKey })
			.run();

		// fetch off chain metadata for each NFT
		let nftData: CandyMachineItem[] = [];
		for (let i = 0; i < nfts.length; i++) {
			let fetchResult = await fetch(nfts[i].uri);
			let json = await fetchResult.json();
			nftData.push(json);
		}

		// set state
		setNftData(nftData);
	};

	// fetch nfts when connected wallet changes
	useEffect(() => {
		fetchNfts();
	}, [wallet]);

	return (
		<Flex flexDirection="column" align="center">
			<Heading mb="20px">NFTs</Heading>
			{!nftData && <Text>You have no NFTs to display.</Text>}
			{nftData && (
				<Grid>
					{nftData.map((nft) => (
						<GridItem>
							<Text>{nft.name}</Text>
							<Image src={nft.uri} />
						</GridItem>
					))}
				</Grid>
			)}
		</Flex>
	);
};

export default FetchNft;
