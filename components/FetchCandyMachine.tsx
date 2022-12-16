import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import {
	CandyMachine,
	CandyMachineItem,
	Metaplex,
} from "@metaplex-foundation/js";
import { useEffect, useState } from "react";
import {
	Button,
	Flex,
	Grid,
	GridItem,
	Image,
	Input,
	Text,
} from "@chakra-ui/react";

const FetchCandyMachine = () => {
	const [candyMachineAddress, setCandyMachineAddress] = useState<string>(
		"9tQLFyLeaUwQ1PN2YDiFztZDxu4KT6px8CBYEapkshAD"
	);
	const [candyMachineData, setCandyMachineData] = useState<CandyMachine>();
	const [pageItems, setPageItems] = useState<CandyMachineItem[]>();
	const [page, setPage] = useState<number>(1);

	const { connection } = useConnection();
	const metaplex = Metaplex.make(connection);

	// fetch candymachine by address
	const fetchCandyMachine = async () => {
		// reset page to 1
		setPage(1);

		// fetch candymachine data
		try {
			const candyMachine = await metaplex
				.candyMachines()
				.findByAddress({ address: new PublicKey(candyMachineAddress) })
				.run();

			setCandyMachineData(candyMachine);
		} catch (e) {
			alert("Please submit a valid CMv2 address.");
		}
	};

	// paging
	const getPage = async (page: number, perPage: number) => {
		if (candyMachineData == null) {
			return;
		}
		const pageItems = candyMachineData.items.slice(
			(page - 1) * perPage,
			page * perPage
		);

		// fetch metadata of NFTs for page
		let nftData: CandyMachineItem[] = [];
		for (let i = 0; i < pageItems.length; i++) {
			let fetchResult = await fetch(pageItems[i].uri);
			let json = await fetchResult.json();
			nftData.push(json);
		}

		// set state
		setPageItems(nftData);
	};

	// previous page
	const prev = async () => {
		if (page - 1 < 1) {
			setPage(1);
		} else {
			setPage(page - 1);
		}
	};

	// next page
	const next = async () => {
		setPage(page + 1);
	};

	// fetch placeholder candy machine on load
	useEffect(() => {
		fetchCandyMachine();
	}, []);

	// fetch metadata for NFTs when page or candy machine changes
	useEffect(() => {
		if (!candyMachineData) {
			return;
		}
		getPage(page, 9);
	}, [candyMachineData, page]);

	return (
		<Flex>
			<Input
				type="text"
				placeholder="Enter Candy Machine v2 Address"
				onChange={(e) => setCandyMachineAddress(e.target.value)}
			/>
			<Button onClick={fetchCandyMachine}>Fetch</Button>

			{candyMachineData && (
				<Text>
					Candy Machine Address: {candyMachineData.address.toString()}
				</Text>
			)}

			{pageItems && (
				<Flex>
					<Grid>
						{pageItems.map((nft) => (
							<GridItem>
								<Text>{nft.name}</Text>
								<Image src={nft.uri} />
							</GridItem>
						))}
					</Grid>
					<Button onClick={prev}>Prev</Button>
					<Button onClick={next}>Next</Button>
				</Flex>
			)}
		</Flex>
	);
};

export default FetchCandyMachine;
