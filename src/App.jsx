import sites from './assets/websites.json'
import './App.css'
import React from 'react'
import {useState, useEffect} from 'react';

function App() {
    const [websites, setWebsites] = useState([]);
    useEffect(() => {
        setWebsites(sites);
    });
    return (
        <>
            <div className="container">
            <h1>Useful Websites</h1>
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

                    {websites.map((website, index) => (
                    <tr key={index}>
                        <td className="website"><a target="_blank" href={website.link}>{website.name}</a></td>
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
