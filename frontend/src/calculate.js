import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import './calculate.css';
import gasImage from './photo/gas.png';
import waterImage from './photo/water.png';
import electricityImage from './photo/electricity.png';
import nextpng from './photo/next.png'
import { useNavigate } from 'react-router-dom';
import Co2Image from './photo/co2.png'
import CarImage from './photo/car.png'
import FootImage from './photo/foot.png'
// Array of questions with their options and types
const questions = [
    {
        question: "Does your household have solar energy sources installed?",
        options: ["Yes", "No"],
        type: "single",
    },
    {
        question: "What heating/cooling system do you use in your household?",
        options: ["Electric", "Gas"],
        type: "single",
    },
    {
        question: "How many hours per day, on average, do you operate your air conditioner or heating system in your household?",
        options: ["0-2 hours", "2-4 hours", "4-6 hours", "More than 6 hours"],
        type: "single",
    },
    {
        question: "Which electric appliances do you use in your household? (select all that apply)",
        options: ["Refrigerator", "Washing machine", "Clothes Dryer", "Dishwasher", "Electric oven", "Microwave"],
        type: "multiple",
    },
    {
        question: "How frequently do you use the washing machine and dryer in your household?",
        options: ["Daily", "Twice in a week", "Once in a week", "Not so often", "I don’t have it"],
        type: "single",
    },
    {
        question: "How often do you use the electric oven in your household?",
        options: ["Daily", "Twice in a week", "Once in a week", "Not so often", "I don’t have it"],
        type: "single",
    },
    {
        question: "How often do you use the dishwasher in your household?",
        options: ["Daily", "Twice in a week", "Once in a week", "Not so often", "I don’t have it"],
        type: "single",
    },
    {
        question: "How frequently do you cook in your household?",
        options: ["Daily", "Twice in a week", "Once in a week", "Not so often", "I don’t cook"],
        type: "single",
    },
    {
        question: "How long do you typically spend showering or bathing?",
        options: ["10-15 minutes", "15-30 minutes", "More than 30 minutes"],
        type: "single",
    },
    {
        question: "Do you have a garden or lawn that needs watering?",
        options: ["Yes", "No"],
        type: "single",
    },
];
const australiaPerCapitaEmissions = 1.23;
const australiaAverageData = [839.5, 563.4, 10200]; // Gas, Electricity, Water

function Calculate() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showChart, setShowChart] = useState(false);
    const [fade, setFade] = useState('');
    const [isOptionSelected, setIsOptionSelected] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [gas, setGas] = useState('');
    const [electricity, setElectricity] = useState('');
    const [water, setWater] = useState('');
    const [inputSubmitted, setInputSubmitted] = useState(false);
    const [chartData, setChartData] = useState(null);
    const [emissions, setEmissions] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false); // 正确放置的 useState

    // Constants for emission factors...
    const EF2_Electricity = 0.85;
    const EF3_Electricity = 0.07;
    const EC_Gas = 25.7;
    const EF1_Gas = 60.6;
    const EF3_Gas = 20.2;
    const emissionFactor_PotableWater = 0.173;
    const emissionFactor_Wastewater = 0.875;
    const [hover, setHover] = useState(false);
    const imageTexts = [
        'Installing solar panels can significantly reduce your electricity bills. In many cases, solar energy users can even sell excess power back to the grid.',
        'Heating and cooling account for about 48% of energy use in a typical home, making it the largest energy expense for most households.',
        'Upgrading to a high-efficiency heating and cooling system can reduce energy consumption by up to 20-50%, lowering both costs and carbon emissions.',
        'Opting for energy-efficient appliances and adopting eco-friendly habits can lead to substantial reductions in a household\'s carbon footprint.',
        'A standard washing machine can emit around 60-150 kg of CO2 per year, depending on the energy efficiency and usage.',
        'Use glass or ceramic dishes for cooking. They\'re like the snuggly blankets of the oven world, helping your food cook evenly and saving energy.',
        'Fully loading your dishwasher before running it can maximize water and energy efficiency, reducing the number of cycles and saving both time and resources.',
        'Minimizing food waste through proper storage, meal planning, and using leftovers can reduce the environmental impact of cooking.',
        'Lowering the water temperature by just 1°C can reduce energy consumption by about 5%, leading to energy and cost savings.',
        'Did you know? Installing a rainwater harvesting system is like giving your garden its own \'water piggy bank\''
      ];
    const buttonStyle = {
        backgroundColor: hover ? 'darkgreen' : 'lightgreen',
        fontSize: '25px',
        // 添加其他样式，如果需要
      };
    // Function to calculate emissions
    const calculateEmissions = () => {
        const electricityValue = parseFloat(electricity);
        const gasValue = parseFloat(gas);
        const waterValue = parseFloat(water);

        const electricityEmissions = (electricityValue * (EF2_Electricity + EF3_Electricity)) / 1000;
        const gasEmissions = (gasValue * EC_Gas * (EF1_Gas + EF3_Gas)) / 1000;
        const waterEmissions = waterValue * emissionFactor_PotableWater + waterValue * emissionFactor_Wastewater;

        return electricityEmissions + gasEmissions + waterEmissions;
    };
     // Function to handle input submission
     const totalEmissionsTonnes = calculateEmissions() / 10000;
     const handleInputSubmit = () => {
        if (gas !== '' && electricity !== '' && water !== '' && parseFloat(gas) >= 0 && parseFloat(electricity) >= 0 && parseFloat(water) >= 0) {
            
            setEmissions(totalEmissionsTonnes);
            // Assuming generateComparisonChart and other chart generation functions are defined
            setInputSubmitted(true);
        } else {
            alert('Please enter all the required data. And the data must be positive.');
        }
    };
    
     // Function to handle option selection
     const handleOptionSelect = (selectedOption) => {
        // 确保isOptionSelected用于控制“下一步”按钮的可用性
        setIsOptionSelected(true);
    
        // 查找当前问题的答案
        let existingAnswer = answers.find(answer => answer.question === questions[currentQuestionIndex].question);
    
        if (questions[currentQuestionIndex].type === "multiple") {
            // 如果当前问题是多选
            if (existingAnswer) {
                // 如果已有答案，检查选项是否已存在
                const optionIndex = existingAnswer.answer.indexOf(selectedOption);
                if (optionIndex > -1) {
                    // 如果找到，则移除（取消选择）
                    existingAnswer.answer.splice(optionIndex, 1);
                } else {
                    // 否则添加（选择）
                    existingAnswer.answer.push(selectedOption);
                }
            } else {
                // 如果还没有答案，直接添加
                existingAnswer = { question: questions[currentQuestionIndex].question, answer: [selectedOption] };
                answers.push(existingAnswer);
            }
        } else {
            // 对于单选问题，直接更新答案
            if (existingAnswer) {
                existingAnswer.answer = selectedOption;
            } else {
                answers.push({ question: questions[currentQuestionIndex].question, answer: selectedOption });
            }
        }
    
        // 更新状态以触发重新渲染
        setAnswers([...answers]);
    };
    
    
    const navigate = useNavigate();
    // Function to move to the next question or display the chart
    const handleNext = () => {
        if (isOptionSelected) {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                
                if(currentQuestionIndex == 9){
                    navigate('/final', { state: { answers: answers,gas:gas,electricity:electricity,water:water,totalEmissionsTonnes: totalEmissionsTonnes} });
                }
                else{
                    setShowChart(true);
                }
                
            }
            setIsOptionSelected(false);
        }
        else{
            alert("Please select an option before moving on.");
        }
    };
    const handleUncoverClick = () => {
        setShowQuiz(true);
    };
    const currentImage = `${process.env.PUBLIC_URL}/${currentQuestionIndex + 1}.png`;

    const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);

    window.addEventListener('resize', handleResize);

    // Cleanup listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    return (
        <div className="container" style={{backgroundColor:'white',height:height,width:'100%'}}>
            {!showChart && !inputSubmitted ? (
                <div className={`fade ${fade} question-container`}>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <img src={Co2Image} style={{width:'100%',height:'200px'}} alt="co2" />
                        <div style={{display:'flex',flexDirection:'column',marginTop:'2%'}}>
                        <h2 style={{fontSize:'40px',marginLeft:'-20%'}}>&nbsp;&nbsp;&nbsp;&nbsp;CARBON</h2>
                        <h2 style={{fontSize:'40px',marginLeft:'-20%',marginTop:'0%'}}>CALCULATOR</h2>
                        </div>
                        
                    </div>
                    <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',backgroundColor:'lightgreen',borderRadius:'40px',height:'80px'}}>
                        <h2 style={{color:'green',fontSize:'40px'}}>&nbsp;&nbsp;Start Now</h2> 
                        <text style={{fontSize:'25px'}}>&nbsp;&nbsp;to make a positive impact on the climate. &nbsp;&nbsp;&nbsp;&nbsp;</text> 

                    </div>
                    <p style={{fontSize:'25px'}}>Please enter your past month usage below based on your monthly bills!!</p>
                    <div style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center',marginTop:'-1%'}} >
                        <div style={{width:'33.3%',display:'flex',alignItems:'center',flexDirection:'column',fontSize:'30px'}}>
                        <img src={electricityImage} style={{width:'200px'}} alt="Electricity"  />
                        <text >Electricity</text>
                            <div style={{display:'flex',flexDirection:'row',marginLeft:'10%'}}>
                            <input type="number" id="electricityInput" value={electricity}  style={{width:'100px'}} onChange={(e) => setElectricity(e.target.value)} />
                            <text>KW/H</text>
                            </div>                           
                        </div>
                        <div style={{width:'33.3%',display:'flex',alignItems:'center',flexDirection:'column',fontSize:'30px'}}>
                                <img src={waterImage} style={{width:'200px'}} alt="Water" />
                                <text style={{marginTop:'-5%'}}>Water</text>
                            <div style={{display:'flex',flexDirection:'row',marginLeft:'3%'}}>
                            <input type="number" id="waterInput" value={water} style={{width:'100px'}} onChange={(e) => setWater(e.target.value)} />
                            <text>L</text>
                            </div>
                        </div>
                        <div style={{width:'33.3%',display:'flex',alignItems:'center',flexDirection:'column',fontSize:'30px'}}>
                        <img src={gasImage} style={{width:'200px'}} alt="Gas" />
                        <text style={{marginTop:'-2%'}}>Gas</text>
                            <div style={{display:'flex',flexDirection:'row',marginLeft:'8%'}}>

                            <input type="number"  id="gasInput" value={gas} style={{width:'100px'}} onChange={(e) => setGas(e.target.value)} />
                            <text>P/J</text>
                            </div>

                            
                        </div>
                       
                        
                       
                    </div>
                    
                    <div style={{marginTop:'2%'}}>
                                    <button
                    onClick={handleInputSubmit}
                    className="calculate-button"
                    >
                    calculate
                    </button>
                    </div>
                </div>
            ) :!showChart && !showQuiz ? (
                <div style={{display:'flex',flexDirection:'column'}}>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                        <img src={Co2Image} style={{width:'15%',height:'200px'}} alt="co2" />
                        <div style={{display:'flex',flexDirection:'column'}}>
                        <h2 style={{fontSize:'40px',marginLeft:'-20%'}}>&nbsp;&nbsp;&nbsp;&nbsp;CARBON</h2>
                        <h2 style={{fontSize:'40px',marginLeft:'-20%',marginTop:'2%'}}>CALCULATOR</h2>
                        </div>
                        
                    </div>
                        <div style={{display: 'flex',
                        flexDirection: 'row',marginTop:'-1%',height:'460px'}}>
                        
                        <div style={{width:'15%'}}> 

                        </div>
                        <div style={{ width: '25%' }}>
                            <div style={{ backgroundColor: '#71b675', display: 'flex', padding: '2%', alignItems: 'center', justifyContent: 'center',padding:'5% 5% 5% 5%', flexDirection: 'column', fontSize: '25px', color: 'black',height:'40%',borderRadius:'20px',height:'70%' }}>
                                <img src={CarImage} alt="Car" style={{width:'80%'}}/>
                                <span style={{ textAlign: 'center' }}>One ton is equivalent to the average weight of a small car</span>
                            </div>
                            <div style={{marginTop:'0%',height:'20%',marginLeft:'-60%'}}>
                            <img src={FootImage} alt="Foot" style={{height:'200%'}}/>
                            </div>
                        </div>

                        <div style={{width:'10%'}}> 

                        </div>
                        <div style={{width:'50%'}}>
                            <p style={{fontSize:'25px',marginTop:'0%'}}>Your household's carbon footprint for the past </p>
                            <p style={{fontSize:'25px',marginTop:'-2%'}}>month is</p>
                            <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginRight:'50%'}}>
                            <p style={{color:'green',fontSize:'50px',marginTop:'-3%'}}>{emissions.toFixed(2)} tons of CO2</p>
                            </div>
                            
                            <div style={{width:'50%',backgroundColor:'lightgreen',marginTop:'-5%',borderRadius:'20px',display:'flex',padding:'2% 2% 2% 2%',alignItems:'flex-start',justifyItems:'center',fontSize:'25px',flexDirection: 'column'}}>
                                <text>The average Australian household has</text>
                                <text>an annual carbon footprint of</text>
                                <text>approximately 15-20 tCo2e</text>
                            </div>
                            <div style={{width:'90%',backgroundColor:'lightgreen',borderRadius:'40px',display:'flex',padding:'2% 2% 2% 2%',alignItems:'flex-start',justifyItems:'center',fontSize:'25px',flexDirection: 'column',marginTop:'2%',marginLeft:'-5%',alignItems:'center'}}>
                                <text style={{color:'darkyellow'}} > Congratulations on discovering your household's carbon footprint!</text>
                            </div>
                            <div style={{width:'90%',display:'flex',padding:'2% 2% 2% 2%',alignItems:'center',justifyItems:'center',fontSize:'25px',flexDirection: 'column',marginTop:'2%',marginLeft:'-4%'}}>
                                <text style={{color:'green'}} > Knowledge is power, and now you have the power to make a change.
            Let's dive into some fun details to give you a better perspective</text>
                            </div>
                            <div style={{width:'60%',borderRadius:'20px',display:'flex',padding:'2% 2% 2% 2%',alignItems:'flex-start',justifyItems:'center',fontSize:'25px',flexDirection: 'column',marginTop:'-1%',marginLeft:'5%'}}>
                            <button onClick={handleUncoverClick} className="calculate-button" style={{width:'100%'}} >Uncover My Carbon Culprits 🕵️‍♂️🌍</button>
                        </div>
                                

                    
                    </div>
                
                
                    </div>
                </div>
                
            ) : (
                <div style={{display:'flex',flexDirection: 'row'}}>
                    <div style={{width:'60%',marginTop:'2%',display:'flex',flexDirection: 'column'}}>
                        <div style={{marginLeft:'2%'}}>
                        <text style={{color:'green',fontSize:'20px'}}>{currentQuestionIndex+1}/10</text>
                        
                        </div>
                        <div style={{marginLeft:'20%'}}>
                            <h2 style={{fontSize:'40px'}}>{questions[currentQuestionIndex].question}</h2>
                        </div>
                
                <div className="options-container">
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <div key={index}>
                            <input
                            type="checkbox"
                            id={`option-${index}`}
                            name="option"
                            value={option}
                            onChange={() => handleOptionSelect(option)}
                            checked={answers.some(answer => answer.question === questions[currentQuestionIndex].question && answer.answer.includes(option))}
                            />

                            <label htmlFor={`option-${index}`}>{option}</label>
                        </div>
                    ))}
                </div>
                <div className="fixed-div">
                {currentQuestionIndex == 9 ? (
                    // 当前是最后一个问题时，显示"Submit"文本
                    <div onClick={handleNext} style={{cursor: 'pointer', fontSize: '25px',color:'white',backgroundColor:'darkgreen',borderRadius:'20px',display:'flex',width:'200px',alignContent:'center',justifyContent:'center',fontSize:"40px",padding:'2%,2%,2%',marginLeft:'0%'}}>
                    Submit
                    </div>
                ) : (
                    // 不是最后一个问题时，显示next图标
                    <img
                    src={nextpng}
                    alt="Next"
                    onClick={handleNext}
                    style={{borderRadius: '50%', width: '100%',marginLeft:'50%'}}
                    />
                )}
                </div>
              </div>
                    <div style={{ width: '50%', display: 'flex', justifyItems: 'center', alignItems: 'center',flexDirection:'column' }}>
                        <div style={{width:'50%',backgroundColor:'lightgreen',marginTop:'10%',justifyContent:'center',paddingLeft:'5%',paddingRight:'5%',borderRadius:'20px'}}>
                        <img src={currentImage} alt={`Question ${currentQuestionIndex + 1}`} style={{ width: '100%', height: '400px', marginTop: '10%' }} />
                        {/* Display the text corresponding to the image below */}
                        <p style={{ textAlign: 'center', marginTop: '10px',fontSize:'20px' }}>{imageTexts[currentQuestionIndex]}</p>
                        </div>
                       
                    </div>     
            </div>

            )}
        </div>
    );
}

export default Calculate;
