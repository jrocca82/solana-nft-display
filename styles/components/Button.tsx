import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
	// style object for base or default style
	baseStyle: {},
	sizes: {
		sm: {
			width: "100px",
			height: "40px",
			fontSize: "18px",
		},
		md: {
			width: "200px",
			height: "40px",
			fontSize: "24px",
		},
	},
	variants: {
		default: {
			bgColor: "#4C4E52",
			color: "white",
		},
		solana: {
			bgGradient: "linear(to-l, solana.green, solana.purple)",
		},
	},
};
