import { useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import RequestAirdrop from "../components/RequestAirdrop";
import useUserSOLBalanceStore from "../stores/useUserSOLBalanceStore";
import { Heading, Text, Flex, chakra } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { NextPage } from "next";

const HomeView: NextPage = () => {
	const wallet = useWallet();
	const { connection } = useConnection();

	const balance = useUserSOLBalanceStore((s) => s.balance);
	const { getUserSOLBalance } = useUserSOLBalanceStore();

	useEffect(() => {
		if (wallet.publicKey) {
			console.log(wallet.publicKey.toBase58());
			getUserSOLBalance(wallet.publicKey, connection);
		}
	}, [wallet.publicKey, connection, getUserSOLBalance]);

	return (
		<PageWrapper>
			<PageHeading>Scaffold Lite</PageHeading>

			<Text size="md">Simply the fastest way to get started.</Text>
			<BoxWrapper>
				<DotIcons />
				<Text align="center" justifyContent="center" as="code">
					<ArrowRightIcon boxSize={3} mr="10px" />
					Start building on Solana
				</Text>
			</BoxWrapper>

			<Flex flexDir="column" align="center" my="50px">
				<RequestAirdrop />
				{wallet.publicKey && (
					<Text my="10px">Public Key: {wallet.publicKey.toBase58()}</Text>
				)}
				{wallet && (
					<Text my="10px">SOL Balance: {(balance || 0).toLocaleString()}</Text>
				)}
			</Flex>
		</PageWrapper>
	);
};
export default HomeView;

const PageWrapper = chakra(Flex, {
	baseStyle: {
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		marginY: "50px",
		height: "100%",
	},
});

const PageHeading = chakra(Heading, {
	baseStyle: {
		marginBottom: "20px",
	},
});

const BoxWrapper = chakra(Flex, {
	baseStyle: {
		backgroundColor: "brand.darkGrey",
		padding: "20px",
		borderRadius: "20px",
		marginTop: "20px",
		flexDirection: "column",
	},
});

const DotIcons = chakra(DotsHorizontalIcon, {
	baseStyle: {
		boxSize: "50px",
		color: "brand.midGrey"
	},
});
