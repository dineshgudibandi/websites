import sites from './assets/websites.json'
import './App.css'
import React from 'react'
import {useState, useEffect} from 'react';



function App() {
    const [websites, setWebsites] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredWebsites, setFilteredWebsites] = useState([]);
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        if (term === '') {
            setSearchResults(filteredWebsites);
        } else {
            const results = filteredWebsites.filter(website =>
                website.name.toLowerCase().includes(term) ||
                website.description.toLowerCase().includes(term)
            );
            setSearchResults(results);
        }
    };
    const filter = (tag) => (e) => {
        e.preventDefault();
        setSelectedCategory(tag);
        setSearchTerm('')
        if( tag === '') {
            setSearchResults(websites);
            setFilteredWebsites(websites);
            return;
        }
        const results = websites.filter(website =>
            website.tags.some(t => t.toLowerCase() === tag.toLowerCase())
        );
        setFilteredWebsites(results);
        setSearchResults(results);
    }
    useEffect(() => {
        setWebsites(sites);
        setSearchResults(sites);
        setFilteredWebsites(sites);
        const uniqueTags = new Set();
        sites.forEach(website => {
            website.tags.forEach(tag => {
                uniqueTags.add(tag.toLowerCase());
            });
        });
        setCategories(Array.from(uniqueTags));
    }, []);
    return (
        <>
            <div className="container">
                <h1>DineshsList</h1>
                <div className="search">
                    <input type="text" placeholder="Search by tags or text" value={searchTerm}
                           onChange={(e) => handleSearch(e)}/>
                    <select className="categories-select" onChange={(e) => filter(e.target.value)(e)}
                    defaultValue={selectedCategory}>
                        <option value="">All Categories</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>

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
                                <td className="categories">{website.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="tag" onClick={(e)=>filter(tag)(e)}>{tag}</span>
                                ))}</td>
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
