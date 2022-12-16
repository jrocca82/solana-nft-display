import { Flex, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import FetchCandyMachine from "../components/FetchCandyMachine";

const CandyMachineView: NextPage = () => {
	return (
		<Flex className="md:hero mx-auto p-4">
			<Heading>Candy Machine</Heading>
			<Flex>
				<FetchCandyMachine />
			</Flex>
		</Flex>
	);
};

export default CandyMachineView;
