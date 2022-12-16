import Link from "next/link";
import {
	Drawer,
	DrawerBody,
	useDisclosure,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	DrawerHeader,
	Button,
	Text,
	chakra,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRef } from "react";

const MenuDrawer = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<>
			<Button ref={btnRef} size="sm" variant="default" onClick={onOpen}>
				<HamburgerIcon boxSize={8} />
			</Button>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<StyledDrawer>
					<DrawerCloseButton />
					<DrawerTitle as="u">Menu</DrawerTitle>

					<DrawerBody>
						<Link href="/">
							<ListItem size="sm">Home</ListItem>
						</Link>
						<Link href="/display">
							<ListItem size="sm">Display NFT</ListItem>
						</Link>
						<Link href="/candy-machine">
							<ListItem size="sm">Candy Machine</ListItem>
						</Link>
					</DrawerBody>
				</StyledDrawer>
			</Drawer>
		</>
	);
};

export default MenuDrawer;

const StyledDrawer = chakra(DrawerContent, {
	baseStyle: {
		backgroundColor: "brand.darkGrey",
	},
});

const DrawerTitle = chakra(DrawerHeader, {
	baseStyle: {
		fontSize: "30px",
		margin: "20px"
	},
});

const ListItem = chakra(Text, {
	baseStyle: {
		paddingY: "10px",
	},
});
