import sites from './assets/websites.json'
import './App.css'
import React from 'react'
import {useState, useEffect} from 'react';



function App() {
    const [websites, setWebsites] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        if (term === '') {
            setSearchResults(websites);
        } else {
            const results = websites.filter(website =>
                website.name.toLowerCase().includes(term) ||
                website.description.toLowerCase().includes(term) ||
                website.tags.some(tag => tag.toLowerCase().includes(term))
            );
            setSearchResults(results);
        }
    };
    useEffect(() => {
        setWebsites(sites);
        setSearchResults(sites);
    }, []);
    return (
        <>
            <div className="container">
                <h1>DineshsList</h1>
                <div className="search">
                    <input type="text" placeholder="Search by tags or text" value={searchTerm}
                           onChange={(e) => handleSearch(e)}/>
                </div>
                <div className="websites">
                    <table>
                        <thead>
                        <tr>
                            <td className="website">Website</td>
                            <td className="description">Description</td>
                            <td className="categories">Categories</td>
                        </tr>
                        </thead>
                        <tbody>

                        {searchResults.map((website, index) => (
                            <tr key={index}>
                                <td className="website"><a target="_blank" href={website.link}>{website.name}</a>
                                </td>
                                <td className="description">{website.description}</td>
                                <td className="categories">{website.tags.join(', ')}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default App
