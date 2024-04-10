import React from "react";
import { Link } from 'react-router-dom';
import './HomePage.css';
import photo1 from './photo/1.jpeg';
import photo2 from './photo/2.jpeg';
import photo3 from './photo/3_logo.jpg';

import photo5 from './photo/5_logo.jpg';
import photo6 from './photo/5.png';
import photo7 from './photo/6.png';
import photo8 from './photo/7.jpeg';
// Add your other photo imports as needed

function HomePage() {
    return (
        <div className="page-container">
            <main className="home-container">
                <header className="home-header">
                    <h1>Household Energy and Environmental Protection in Australia</h1>
                </header>
                <section className="home-section why-project">
                    <div className="why-project-content">
                        <img src={photo1} alt="Visual representation of energy and environment" className="project-image"  style={{height:'300px'}}/>
                        <div className="why-project-text">
                            <h2 style={{marginLeft:'25%'}}>Introduction of Climate Action</h2>                
                            <p style={{textAlign: 'justify'}}>Australia's climate action embodies a commitment to safeguard the environment and contribute to the global effort against climate change. As a nation surrounded by diverse natural ecosystems, from the Great Barrier Reef to the vast outback, the impacts of climate change are both immediate and profound. Australia's unique biodiversity and landscapes are at significant risk from rising temperatures, increased frequency of extreme weather events, and shifting rainfall patterns.</p>
                        </div>
                    </div>
                </section>
                <br/>
                <section className="home-section why-project">
                    <div className="why-project-content">
                        <img src={photo2} alt="Visual representation of energy and environment" className="project-image"  style={{height:'300px'}}/>
                        <div className="why-project-text">
                            <h2 style={{marginLeft:'30%'}}>Climate Action Jeopardize</h2>                
                            <p style={{textAlign: 'justify'}}>Climate change has direct and indirect effects on human health. Climate change has led to an increase in the frequency and intensity of extreme weather events, such as heavy rains, droughts, and storms. These extreme weather events can cause floods, droughts, food poisoning and other health problems, threatening people's lives, drinking water and food security. In addition, climate change will increase temperatures, air pollution and the spread of infectious diseases, leading to an increased risk of respiratory and cardiovascular diseases.</p>
                        </div>
                    </div>
                </section>
                <section className="home-section why-project">
                    <div className="why-project-content">
                        <img src={photo8} alt="Visual representation of energy and environment" className="project-image" style={{height:'300px'}}/>
                        <div className="why-project-text">
                            <h2 style={{marginLeft:'15%'}}>The impact of household energy on weather</h2>                
                            <p style={{textAlign: 'justify'}}>
                            The effects of household energy use range from increasing the frequency of extreme weather events, such as heat waves, floods and droughts, to changing precipitation patterns and seasonal climate change. In the long term, these changes affect crop production, threaten water supplies and pose a threat to biodiversity. In addition, climate change caused by energy consumption will also exacerbate sea level rise, affecting coastlines and communities in low-lying areas. Therefore, by reducing household energy use and switching to clean, renewable energy sources, every household can play a role in mitigating climate change. Energy-saving measures, such as improving home insulation, using energy-efficient light bulbs and appliances, and installing solar panels, not only reduce greenhouse gas emissions, but also financially save families money. Simple changes, such as reducing wasteful electricity and water, are important steps towards a more sustainable future.
                            </p>
                        </div>
                    </div>
                </section>
                <div style={{display: 'flex', alignItems: 'center' , flexDirection: 'column'}}>
                <h2>Click the button below to start our home energy tour </h2>
                <h2> see how your home's CO2 emissions impact the weather.</h2>
                </div>

                <nav className="home-navigation">
                    <Link to="/calculate" className="home-link calculate-link">Calculate Carbon Dioxide in the Household</Link>
                </nav>
            </main>
            <aside className="knowledge-sidebar" style={{marginTop:'5%'}}>
                <p style={{color:'black',marginLeft:'130%',width:'10%'}}>other scources</p>
                <a href="https://climateactionaustralia.net.au/#:~:text=Climate%20Action%20Australia%20is%20committed,trustworthy%20evidence%2C%20and%20helpful%20resources." target="_blank" rel="noopener noreferrer" className="knowledge-link">
                    <div className="image-container">
                        <img src={photo3} alt="No Poverty" className="hover-image"/>
                        <span className="hover-text">CAA</span>
                    </div>
                </a>

                <a href="https://www.climatechangeinaustralia.gov.au/en/" target="_blank" rel="noopener noreferrer" className="knowledge-link">
                    <div className="image-container">
                        <img src={photo5} alt="No Poverty" className="hover-image"/>
                        <span className="hover-text">CCA</span>
                    </div>
                </a>
                <a href="https://www.unaa.org.au/work-with-us/climate-change/" target="_blank" rel="noopener noreferrer" className="knowledge-link">
                    <div className="image-container">
                        <img src={photo6} alt="No Poverty" className="hover-image"/>
                        <span className="hover-text">UNAA</span>
                    </div>
                </a>
                <a href="https://www.csiro.au/en/research/environmental-impacts/climate-change" target="_blank" rel="noopener noreferrer" className="knowledge-link">
                    <div className="image-container">
                        <img src={photo7} alt="No Poverty" className="hover-image"/>
                        <span className="hover-text">CSIRO</span>
                    </div>
                </a>

                {/* Repeat for other links with different images and URLs */}
            </aside>
        </div>
    );
}

export default HomePage;
