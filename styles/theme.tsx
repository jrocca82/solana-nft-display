import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { Button } from "./components/Button";
import { Text } from "./components/Text";

const theme = extendTheme({
	fonts: {
		heading: "'Oxygen', sans-serif",
		body: "'Oxygen', sans-serif",
	},
	colors: colors,
	components: {
		Button,
		Text,
	},
	styles: {
		global: {
			body: {
				bg: "black",
				color: "white",
			},
		},
	},
});

export default theme;
