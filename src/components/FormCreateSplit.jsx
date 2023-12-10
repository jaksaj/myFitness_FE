import { useState } from "react";

function FormCreateSplit() {
    const [selectedSplit, setSelectedSplit] = useState("");
    const handleSplitChange = (e) => {
        const inputValue = e.target.value
        setSelectedSplit(inputValue)
    }
    return(
        <div>
            <h2>Select a split!</h2>
            <select onChange={handleSplitChange} value={selectedSplit}>
                <option value="PPL">PPL</option>
                <option value="Full_body">Full body</option>
                <option value="Upper_lower">Upper-Lower</option>
            </select>
        </div>
    )
}

export default FormCreateSplit;