"use client";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import Home from "./components/Home";

function App() {

   



    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <div className="App">
                <Home/>
            </div>
        </ErrorBoundary>
        
    )
}

export default App;
