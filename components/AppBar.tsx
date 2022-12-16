import Link from "next/link";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Text, Flex, Image, chakra } from "@chakra-ui/react";
import MenuDrawer from "./MenuDrawer";
require("@solana/wallet-adapter-react-ui/styles.css");

const AppBar = () => {
	return (
		<AppBarWrapper>
			<MenuWrapper>
				<MenuDrawer />
				<SolanaLogo src="solanaLogo.svg" alt="solana-logo" />
				<LinkWrapper>
					<Link href="/">
						<Text>Home</Text>
					</Link>
					<Link href="/display">
						<Text>Display NFT</Text>
					</Link>
					<Link href="/candy-machine">
						<Text>Candy Machine</Text>
					</Link>
				</LinkWrapper>
			</MenuWrapper>
			<ButtonWrapper>
				<WalletMultiButton />
			</ButtonWrapper>
		</AppBarWrapper>
	);
};

export default AppBar;

const AppBarWrapper = chakra(Flex, {
	baseStyle: {
		width: "100vw",
		backgroundColor: "brand.darkGrey",
		justifyContent: "space-between",
		height: "80px",
		alignItems: "center",
	},
});

const MenuWrapper = chakra(Flex, {
	baseStyle: {
		width: "60%",
		alignItems: "center",
		justifyContent: "flex-start",
	},
});

const LinkWrapper = chakra(Flex, {
	baseStyle: {
		width: "50%",
		justifyContent: "space-around",
	},
});

const ButtonWrapper = chakra(Flex, {
	baseStyle: { paddingRight: "50px" },
});

const SolanaLogo = chakra(Image, {
	baseStyle: {
		boxSize: 150,
	},
});
