import { Flex, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import FetchCandyMachine from "../components/FetchCandyMachine";

const CandyMachineView: NextPage = () => {
	return (
		<Flex flexDir="column" align="center" mt="50px">
			<Heading mb="20px">Candy Machine</Heading>
			<Flex>
				<FetchCandyMachine />
			</Flex>
		</Flex>
	);
};

export default CandyMachineView;
