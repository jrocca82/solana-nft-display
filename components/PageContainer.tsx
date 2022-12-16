import { chakra, Flex } from "@chakra-ui/react";
import { ReactNode } from "react"
import AppBar from "./AppBar";
import Footer from "./Footer";

type PageContainerProps = {
    children: ReactNode;
}

const PageContainer = ({children}: PageContainerProps) => {
    return (
        <PageWrapper>
            <AppBar />
            {children}
            <Footer/>
        </PageWrapper>
    )
}

export default PageContainer;

const PageWrapper = chakra(Flex, {
    baseStyle: {
        flexDirection: "column",
        maxWidth: "100vw",
        overflowX: "hidden",
        minHeight: "100vh",
        justifyContent: "space-between"
    }
})