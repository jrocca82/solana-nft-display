import { Flex, Text, Image, chakra } from "@chakra-ui/react";
import Link from "next/link";

const Footer = () => {
	return (
		<FooterWrapper>
			<FooterLogo src="solanaLogoMark.svg" alt="solana-logo" />
			<Flex>
				<Text>
					Powered by{" "}
					<Link rel="noreferrer" href="https://solana.com/" target="_blank">
						Solana
					</Link>
				</Text>
			</Flex>
		</FooterWrapper>
	);
};

export default Footer;

const FooterWrapper = chakra(Flex, {
	baseStyle: {
		width: "100%",
		backgroundColor: "brand.darkGrey",
		justifyContent: "center",
		height: "50px",
		alignItems: "center",
	},
});

const FooterLogo = chakra(Image, {
	baseStyle: {
		marginX: "10px",
		boxSize: 5
	}
})
