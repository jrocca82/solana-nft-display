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
	Heading,
	Image,
	Input,
	Text,
	HStack,
	createStandaloneToast,
	SimpleGrid,
	Card,
	Spinner,
} from "@chakra-ui/react";

const { ToastContainer, toast } = createStandaloneToast();

type NFTJsonType = {
	name: string;
	image: string;
};

const FetchCandyMachine = () => {
	const [candyMachineAddress, setCandyMachineAddress] = useState<string>(
		"CeDUohkTQ5SNCHcnRyyF6tbWGdpEbdti5k2yEyVEscjT"
	);
	const [candyMachineData, setCandyMachineData] = useState<CandyMachine>();
	const [loading, setLoading] = useState<boolean>();
	const [pageItems, setPageItems] = useState<NFTJsonType[]>();
	const [page, setPage] = useState<number>(1);

	const { connection } = useConnection();
	const metaplex = Metaplex.make(connection);

	// fetch candy machine by address
	const fetchCandyMachine = async () => {
		setLoading(true);
		// reset page to 1
		setPage(1);

		// fetch candy machine data
		try {
			const candyMachine = await metaplex
				.candyMachines()
				.findByAddress({ address: new PublicKey(candyMachineAddress) })
				.run();

			setCandyMachineData(candyMachine);
		} catch (e) {
			toast({
				title: "An error occurred.",
				description: "Cannot find candy machine",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
		setLoading(false);
	};

	const getPage = async (page: number, perPage: number) => {
		setLoading(true);
		const pageItems = candyMachineData.items.slice(
			(page - 1) * perPage,
			page * perPage
		);

		// fetch metadata of NFTs for page
		let nftData = [];
		for (let i = 0; i < pageItems.length; i++) {
			let fetchResult = await fetch(pageItems[i].uri);
			let json = await fetchResult.json();
			nftData.push(json);
		}

		// set state
		setPageItems(nftData);
		setLoading(false);
	};

	const prev = async () => {
		setPage(page - 1);
	};

	// next page
	const next = async () => {
		setPage(page + 1);
	};

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
		<Flex flexDir="column" align="center">
			<ToastContainer />
			{candyMachineData && (
				<Text>
					Current Candy Machine Address: {candyMachineData.address.toString()}
				</Text>
			)}
			<Text size="sm" mt="30px">
				Find another candy machine:
			</Text>
			<HStack mb="30px" align="flex-end" justify="flex-start" textAlign="left">
				<Input
					type="text"
					placeholder="Enter Candy Machine v2 Address"
					onChange={(e) => setCandyMachineAddress(e.target.value)}
					w="300px"
				/>

				<Button variant="solana" mx="20px" onClick={fetchCandyMachine}>
					{loading ? <Spinner /> : <Text>Fetch</Text>}
				</Button>
			</HStack>

			{loading && <Spinner />}

			{!loading && pageItems && (
				<Flex flexDir="column" align="center">
					<SimpleGrid
						columns={{ base: 2, lg: 3 }}
						rowGap={{ base: "10", lg: "16" }}
						alignItems="center"
						justifyContent="center"
					>
						{pageItems.map((nft, i) => (
							<Card
								margin="20px"
								padding="20px"
								bgColor="brand.darkGrey"
								w="300px"
								borderRadius="20px"
								align="center"
								height="300px"
								key={i}
							>
								<Heading color="white" fontSize="24px">
									{nft.name}
								</Heading>
								<Image
									src={nft.image}
									maxHeight="200px"
									borderRadius="20px"
									mt="20px"
								/>
							</Card>
						))}
					</SimpleGrid>
					<HStack mb="50px">
						<Button
							disabled={page === 1}
							onClick={prev}
							variant="solana"
							size="sm"
						>
							Prev
						</Button>
						<Button onClick={next} variant="solana" size="sm">
							Next
						</Button>
					</HStack>
				</Flex>
			)}
		</Flex>
	);
};

export default FetchCandyMachine;
