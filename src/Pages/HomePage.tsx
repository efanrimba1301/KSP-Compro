import { Navbar } from "@/Components/Landing-ui/Navbar";
import { usePageTracking } from "../hooks/usePageTracking";

const HomePage = () => {
    usePageTracking('/')
    return (
        <div>
            <Navbar />
        </div>
    )
}

export default HomePage;