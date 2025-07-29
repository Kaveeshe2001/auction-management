import { Container } from "react-bootstrap";
import Banner from "../../components/Home/Banner/Banner";
import Categories from "../../components/Home/Categories/Categories";
import Feature from "../../components/Home/Feature/Feature";

function Home() {
    return (
        <>
         <Banner />
         <Categories />

         <Container>
            <Feature />
         </Container>
        </>
    );
};

export default Home;