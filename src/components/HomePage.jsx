import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import FormCreateSplit from './FormCreateSplit';
function HomePage() {
    return(
        <>
            <Routes>
                <Route path="/create" Component={FormCreateSplit} />
            </Routes>
            <h1>Welcome to myFitness</h1>
            <p>Over here you can track your workout splits and add new ones!</p>
            <p>To add new split click "+" below.</p>
            <Link to={"/create"}>
                <button>+</button>
            </Link>
        </>
    )
}

export default HomePage;