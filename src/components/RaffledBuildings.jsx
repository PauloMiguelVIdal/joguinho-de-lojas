import React, { useState } from 'react';

const RaffledBuildings = () => {
    // Arrays para sortear
    const RankS = ['Item1A', 'Item1B', 'Item1C'];
    const RankA = ['Item2A', 'Item2B', 'Item2C'];
    const RankB = ['Item3A', 'Item3B', 'Item3C'];
    const RankC = ['Item4A', 'Item4B', 'Item4C'];


    const [selectedItems, setSelectedItems] = useState([]);

    // Função para sortear um item de cada array
    const raffleItems = () => {
        const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

        const newSelectedItems = [
            randomItem(RankS), 
            randomItem(RankA), 
            randomItem(RankB), 
            randomItem(RankC), 
         
        ];

        setSelectedItems(newSelectedItems);
    };

    return (
        <div>
            <h1>Sorteador de Itens</h1>
            <button onClick={raffleItems}>Sortear</button>
            <h2>Itens Sorteados:</h2>
            <ul>
                {selectedItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default RaffledBuildings;