import { useCallback, useState } from 'react';
import './App.css';

function App() {
    const SYMBOL_X = 'X';
    const SYMBOL_O = 'O';

    const [currentStep, setCurrentStep] = useState(SYMBOL_O);
    const [cells, setCells] = useState(Array(9).fill(null));
    const [winnerSequence, setWinnerSequence] = useState();

    const getSymbolClassName = (symbol) => {
        if (symbol === SYMBOL_X) return 'symbol--x';
        if (symbol === SYMBOL_O) return 'symbol--o';
        return '';
    };

    const renderSymbol = (symbol) => {
        return (
            <span className={`symbol ${getSymbolClassName(symbol)}`}>
                {symbol}
            </span>
        );
    };

    const computerWinner = (cells) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                return [a, b, c];
            }
        }
    };

    const handleCellClick = useCallback(
        (index) => {
            if (cells[index] || winnerSequence) return;

            const cellsCopy = cells.slice();
            cellsCopy[index] = currentStep;

            const winner = computerWinner(cellsCopy);

            setCells(cellsCopy);
            if (winner) {
                setWinnerSequence(winner);
            } else {
                setCurrentStep(currentStep === SYMBOL_O ? SYMBOL_X : SYMBOL_O);
            }
        },
        [cells, currentStep, winnerSequence]
    );

    return (
        <div className="game">
            <div className="game-info">Ход:{renderSymbol(currentStep)}</div>

            <div className="game-field">
                {cells.map((symbol, index) => {
                    const isWinner = winnerSequence?.includes(index);
                    return (
                        <button
                            key={index}
                            className={`cell ${isWinner ? 'cell--win' : ''}`}
                            onClick={() => handleCellClick(index)}
                        >
                            {symbol ? renderSymbol(symbol) : null}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
