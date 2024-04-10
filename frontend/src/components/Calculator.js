import React, { useState } from 'react';
import './Calculator.css'; // 导入样式文件


const Calculator = () => {
    const [electricity, setElectricity] = useState('');
    const [water, setWater] = useState('');
    const [gas, setGas] = useState('');
    const [co2, setCO2] = useState(0);
    const [showCO2Result, setShowCO2Result] = useState(false); // 控制排放量显示状态

    const calculateCO2 = () => {
        // CO2 emissions conversion factors (kg CO2 per unit)
        const electricityCO2Factor = 0.5; // Assume 0.5 kg CO2 per kWh
        const waterCO2Factor = 0.2; // Assume 0.2 kg CO2 per liter
        const gasCO2Factor = 2; // Assume 2 kg CO2 per m^3

        // Calculate CO2 emissions
        const electricityCO2 = electricity * electricityCO2Factor;
        const waterCO2 = water * waterCO2Factor;
        const gasCO2 = gas * gasCO2Factor;

        // Total CO2 emissions
        const totalCO2 = electricityCO2 + waterCO2 + gasCO2;
        setCO2(totalCO2);
        setShowCO2Result(true); // 在计算完成后显示排放量
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="CalculatorContainer">
                        <div id="Calculator">
                            <h1>CO2 Emissions Calculator</h1>
                            <div>
                                <label>Electricity Usage (kWh/month):</label>
                                <input type="number" value={electricity} onChange={(e) => setElectricity(e.target.value)} />
                            </div>
                            <div>
                                <label>Water Usage (liters/month):</label>
                                <input type="number" value={water} onChange={(e) => setWater(e.target.value)} />
                            </div>
                            <div>
                                <label>Gas Usage (m³/month):</label>
                                <input type="number" value={gas} onChange={(e) => setGas(e.target.value)} />
                            </div>
                            <button onClick={calculateCO2} className="btn btn-primary">Calculate CO2 Emissions</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className={`ResultContainer ${showCO2Result ? 'show' : ''}`}>
                        <div id="CO2Result">
                            <h2>CO2 Emissions:</h2>
                            <p>{co2} kg CO2</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
