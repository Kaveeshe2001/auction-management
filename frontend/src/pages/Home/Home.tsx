import { Container } from "react-bootstrap";
import Banner from "../../components/Home/Banner/Banner";
import Categories from "../../components/Home/Categories/Categories";
import Feature from "../../components/Home/Feature/Feature";
import LatestAuctions from "../../components/Home/LatestAuctions/LatestAuctions";

function Home() {
    return (
        <>
         <Banner />
         <Container>
            <LatestAuctions />
         </Container>
         <Categories />

         <Container>
            <Feature />
         </Container>
        </>
    );
};

export default Home;