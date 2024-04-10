import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './circle.css';
import FootPNG from './photo/footA.png';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Earth1 from './photo/earth1.png'
import { useNavigate } from 'react-router-dom';

function FinalPage() {
  const navigate = useNavigate();
  const [showAnswers, setShowAnswers] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); // Hooks should be at the top level
  const location = useLocation();
  const { answers, gas, electricity, water, totalEmissionsTonnes } = location.state || {
    answers: [],
    gas: '',
    electricity: '',
    water: '',
    totalEmissionsTonnes: ''
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnswers(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const data = {
    labels: ['UK', 'USA', 'YOU', 'AUSTRALIA', 'WORLD'],
    datasets: [
      {
        label: 'Tons of CO2',
        data: [4.7/12, 14.9/12, totalEmissionsTonnes, 15/12, 4.7/12],
        backgroundColor: '#bebaba',
        hoverBackgroundColor: '#2d9331',
        borderWidth: 1,
      },
    ],
  };

  const earthImage = totalEmissionsTonnes > (15/12)
  ? `${process.env.PUBLIC_URL}/earth2.png`
  : `${process.env.PUBLIC_URL}/earth1.png`;
  const earthcolor = totalEmissionsTonnes > (15/12)
  ? '#ffb5b5'
  : '#71b674';
   
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false, // This will remove the y-axis grid lines
        },
        title: {
          display: true,
          text: 'Tons of CO2',
          font: {
            size: 20, // Set the font size for the Y-axis title
          },
        },
      },
      x: {
        grid: {
          display: false, // This will remove the y-axis grid lines
        },
        title: {
          display: true,
          font: {
            size: 20, // Set the font size for the X-axis title
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      title: {
        display: true,
        text: 'Your Emission vs. Other Countries Emission',
        color:'#2D9331',
        font: {
          size: 20, // Set the font size for the chart title
        },
      },
    },
    maintainAspectRatio: false, // Prevent default width & height
    onHover: (event, chartElement) => {
      const index = chartElement[0]?.index;
      // Change the background color of the dataset by manipulating the DOM directly
      if (index !== undefined && index !== activeIndex) {
        data.datasets[0].backgroundColor = data.labels.map((_, i) => (i === index ? 'green' : 'grey'));
        setActiveIndex(index);
      }
    },
  };
  

  if (!answers || !Array.isArray(answers)) {
    return <div>No answers to display or you accessed this page directly.</div>;
  }
  const handleInputSubmit = () => {
    navigate('/');
};

  return (
    <div>
      {!showAnswers ? (
        <>
          <div className="spinner"></div>
          <div className="analyzing-text">Analysing your carbon footprint...</div>
        </>
      ) : (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', height:'1700px'}}>
          <div>
            <h1>Analysis of Your Household Consumption</h1>
          
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> 
          <h2>Here's the breakdown of your footprint:</h2>
          <img src={FootPNG} style={{ width: '50px', height: '50px' }} alt="co2" />
          </div>
          <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center',height:'600px',marginTop:'1%'}}>
            
            <div style={{width:'44.7%',marginLeft:'5%',height:'511px',backgroundColor:'#fdf8f8',marginRight:'5%',borderRadius:'10px'}}>
            <Bar data={data} options={options} style={{width:'90%',marginLeft:'5%',marginRight:'5%'}}/>
            </div>
            <div style={{width:'30%',height:'511px',backgroundColor:'#dbf6b9',display:'flex',alignItems:'center',paddingLeft:'5%',paddingRight:'5%',justifyContent:'center',flexDirection:'column',marginRight:'5%',textAlign: 'center'}}>
            <img src={`${process.env.PUBLIC_URL}/analysis1.png`} style={{ width: '100px', height: '100px', marginTop: '0' }} alt="co2" />
              <text style={{fontSize:'30px',marginTop:'2%'}}> 
              This graph illustrates a comparison between your household's energy and resource consumption and the average consumption of an individual. It provides valuable insights into areas where you can make more sustainable choices to reduce your carbon footprint and live a greener lifestyle.
              </text>
            </div>
          </div>
          <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center',height:'600px',marginTop:'3%'}}>
            
          <div style={{width:'39%',marginLeft:'5%',height:'511px',backgroundColor:'#dbf6b9',display:'flex',alignItems:'center',paddingLeft:'5%',paddingRight:'5%',justifyContent:'center',flexDirection:'column',marginRight:'5%',textAlign: 'center'}}>
              <img src={Earth1} style={{ width: '150px', height: '150px' }} alt="co2" />
              <h2 style={{color:'green',fontSize:'30px'}}>Did you know?</h2>
              <text style={{fontSize:'30px'}}> 
Excessive carbon emissions from household activities contribute to global warming, leading to climate change, rising sea levels, and extreme weather events. It's time to reduce our carbon footprint and protect our planet! </text>

            </div>
            <div style={{width:'44.7%',height:'511px',backgroundColor:'#fdf8f8',marginRight:'5%'}}>
            <Bar data={data} options={options} style={{width:'90%',marginLeft:'5%',marginRight:'5%'}}/>
            </div>
          </div>
          <div style={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: earthcolor, marginTop:'5%',borderRadius:'20px',marginBottom:'5%'}}>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center',  marginTop:'5%',borderRadius:'20px'}}>
                <div style={{marginTop:'-5%'}}>
                <img src={earthImage} style={{ width: '200px', height: '200px' }} alt="Earth" />

                </div>
                <div style={{
                    width: '80%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center', // Centers content vertically in the container
                    fontSize: '20px',
                    marginLeft: "-15%",
                    color:'black',
                    marginTop:'-5%',
                    
                  }}>
                    {
                      totalEmissionsTonnes <= (15 / 12) ? (
                        <>
                          <p style={{textAlign: 'center',marginTop:'-1%'}}>Yayyy!! You’re on the right path</p>
                          <p style={{textAlign: 'center',marginTop:'-1%'}}>Your emissions are less than the average</p>
                          <p style={{ textAlign: 'center',marginTop:'-3%' }}>emissions of an Australian household</p>

                          <p style={{textAlign: 'center', color: 'white',marginTop:'-1%'}}>Let’s try to do better!!</p> {/* Adjusted color for visibility */}
                        </>
                      ) : (
                        <>
                          <p style={{textAlign: 'center'}}>Oops!! You can do better</p>
                          <p style={{textAlign: 'center',marginTop:'-1%'}}>Your emissions are more than the average</p>
                          <p style={{textAlign: 'center',marginTop:'-3%'}}>emissions of an Australian household</p>
                          <p style={{textAlign: 'center', color: 'white',marginTop:'-1%'}}>Let’s try to reduce them!</p> {/* Adjusted color for visibility */}
                        </>
                      )
                    }
                  </div>
              </div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent:'center',marginTop:'-2%',marginBottom:'5%'}}>
              <button
                onClick={handleInputSubmit}
                className="click-button"
                style={{marginRight:'5%',color:'white'}}
              >
                &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;Quick Wins &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
              </button>
              <button
                onClick={handleInputSubmit}
                className="click-button"
                style={{marginLeft:'5%',color:'white'}}
              >
                Sustainable Strategies
              </button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinalPage;
