import React, { useEffect } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { FaHome, FaLanguage } from 'react-icons/fa';

const Navbar = () => {
    const [isDarkMode, setDarkMode] = React.useState(false);

    const toggleDarkMode = (checked) => {
        setDarkMode(checked);
    };

    useEffect(() => {
        document.body.style.transition = 'background-color 0.3s ease';
        document.body.style.backgroundColor = isDarkMode ? '#121212' : '#ffffff';
    }, [isDarkMode]);

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#333A40' }}>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <a className="navbar-brand text-white" href="/" style={{ fontWeight: 'bold' }}>NewsMania</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
                        <li className="nav-item">
                            <a className="nav-link active text-white" aria-current="page" href="/">
                                <FaHome style={{ height: '20px', marginRight: '8px' }} />
                                Home
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FaLanguage style={{ height: '20px', marginRight: '8px' }} />
                                Languages
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Hindi</a></li>
                                <li><a className="dropdown-item" href="#">English</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active text-white" aria-current="page" href="/notes">
                                Notes
                            </a>
                        </li>
                        {/* <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </ul>
                    {/* Right-aligned items */}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
                        <li className="nav-item">
                            <DarkModeSwitch
                                style={{
                                    height: '30px',
                                    width: '30px',
                                    margin: '0 10px', // Add margin for spacing between icons
                                }}
                                checked={isDarkMode}
                                onChange={toggleDarkMode}
                            />
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active text-white" aria-current="page" href="#">
                                <img
                                    src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                                    height="40px"
                                    alt="Profile"
                                    className="rounded-circle"
                                    style={{
                                        transition: 'transform 0.3s ease',
                                        marginTop: '0', // Ensure both icons are aligned vertically
                                    }}
                                />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
