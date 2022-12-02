import { WalletError } from "@solana/wallet-adapter-base";
import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider as ReactUIWalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
	PhantomWalletAdapter,
	SolflareWalletAdapter,
	TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import * as web3 from "@solana/web3.js";
import { FC, ReactNode, useCallback } from "react";
import { AutoConnectProvider, useAutoConnect } from "./AutoConnectProvider";
import { NetworkConfigurationProvider } from "./NetworkConfigurationProvider";

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const { autoConnect } = useAutoConnect();

	const endpoint = web3.clusterApiUrl("devnet");

	const wallets = [
		new PhantomWalletAdapter(),
		new SolflareWalletAdapter(),
		new TorusWalletAdapter(),
	];

	const onError = useCallback((error: WalletError) => {
		alert({
			type: "error",
			message: error.message ? `${error.name}: ${error.message}` : error.name,
		});
		console.error(error);
	}, []);

	return (
		// TODO: updates needed for updating and referencing endpoint: wallet adapter rework
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider
				wallets={wallets}
				onError={onError}
				autoConnect={autoConnect}
			>
				<ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<>
			<NetworkConfigurationProvider>
				<AutoConnectProvider>
					<WalletContextProvider>{children}</WalletContextProvider>
				</AutoConnectProvider>
			</NetworkConfigurationProvider>
		</>
	);
};
