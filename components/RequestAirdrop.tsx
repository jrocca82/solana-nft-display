import { Button, chakra, Flex, Text } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/toast";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
	LAMPORTS_PER_SOL,
	TransactionSignature,
	sendAndConfirmTransaction,
} from "@solana/web3.js";
import { useCallback, useState } from "react";
import useUserSOLBalanceStore from "../stores/useUserSOLBalanceStore";

const { ToastContainer, toast } = createStandaloneToast();

const RequestAirdrop = () => {
	const { connection } = useConnection();
	const { publicKey } = useWallet();
	const { getUserSOLBalance } = useUserSOLBalanceStore();

	const onClick = useCallback(async () => {
		if (!publicKey) {
			toast({
				title: "An error occurred.",
				description: "Cannot find wallet",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			return;
		}

		let signature: TransactionSignature = "";

		try {
			signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);

			// Not actually deprecated
			await connection.confirmTransaction(signature, "confirmed");
			toast({
				title: "Success!",
				description: "Airdrop successful",
				status: "success",
				duration: 9000,
				isClosable: true,
			});

			getUserSOLBalance(publicKey, connection);
		} catch (error: any) {
			toast({
				title: "Uh-oh!",
				description: "Airdrop failed",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	}, [publicKey, connection, getUserSOLBalance]);

	return (
		<ButtonWrapper>
			<Button onClick={onClick} variant="solana" size="md">
				<Text size="sm">Airdrop 1 SOL</Text>
			</Button>
			<ToastContainer />
		</ButtonWrapper>
	);
};

export default RequestAirdrop;

const ButtonWrapper = chakra(Flex, {
	baseStyle: {
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		marginY: "20px",
	},
});
