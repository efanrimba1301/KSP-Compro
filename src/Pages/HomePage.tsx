import { usePageTracking } from "../hooks/usePageTracking";

const HomePage = () => {
    usePageTracking('/')
    return (
        <div>
            <h1>HomePage</h1>
        </div>
    )
}

export default HomePage;