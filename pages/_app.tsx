import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import "@fontsource/oxygen";
import { ConnectionContext } from "../contexts/ContextProvider";
import PageContainer from "../components/PageContainer";

require("@solana/wallet-adapter-react-ui/styles.css");

function App({ Component, pageProps }: AppProps) {
	return (
		<ConnectionContext>
			<ChakraProvider theme={theme}>
				{/* <Notifications /> */}
				<PageContainer>
					<Component {...pageProps} />
				</PageContainer>
			</ChakraProvider>
		</ConnectionContext>
	);
}

export default App;
