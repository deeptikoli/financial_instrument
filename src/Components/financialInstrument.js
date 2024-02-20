import React, { useEffect, useState } from "react";
import axios from "axios";
import { orderBy } from "lodash";
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const FinantialInstruments = () => {
const [response, setResponse] = useState(null);
const [sortConfig, setSortConfig] = useState({key: null, direction: 'asc'})

useEffect(() => {
    axios.get("sample_data.json").then((data) => {
        setResponse(data.data || [])
    }).catch(() =>{
        setResponse([])
    })
}, [])

const handleSort = (key) => {
    console.log("key", key)
    let direction = 'asc';
    if(sortConfig.key === key && direction === 'asc') {
        direction = 'desc';
    }
    setSortConfig({key, direction})
}

const sortedAssetClass = (item) => {
    switch(item.assetClass) {
        case "Equities":
            return 1;
        case "Macro":
            return 2;
        case "Credit":
            return 3;
        default:
            return 4;
    }}

let sortedData = response || [];
if (sortConfig.key === 'assetClass') {
    sortedData= orderBy(sortedData, [sortedAssetClass], [sortConfig.direction])
} else {
    sortedData= orderBy(sortedData, [sortConfig.key], [sortConfig.direction])
}

const getClassName = (assetClass) => {
    switch(assetClass) {
        case "Equities":
            return "equities";
        case "Macro":
            return "macro";
        case "Credit":
            return "credit";
        default:
            return;
    }
}

    return (
        <div>
            <table className="tablecontainer">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('ticker')}>Ticker{sortConfig.key === 'ticker' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}</th>
                        <th onClick={() => handleSort('price')}>Price{sortConfig.key === 'price' && (sortConfig.direction === 'desc' ? <FaSortUp /> : <FaSortDown />)}</th>
                        <th onClick={() => handleSort('assetClass')}>Asset Class{sortConfig.key === 'assetClass' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => (
                        <tr key={index} className={getClassName(item.assetClass)}>
                            <td>{item.ticker}</td>
                            <td>{item.price}</td>
                            <td>{item.assetClass}</td>
                        </tr>
                    ))}
                </tbody>
            </table> 
        </div>
    )
}

export default FinantialInstruments;