import { useState } from 'react';
import MineSweeper from './components/organisms/mineSweeper/MineSweeper';
import MineSweeperServer from './components/organisms/mineSweeperServer/MineSweeperServer';
import Button from './components/atoms/button/Button';

type GameModeTypes = 'serverLogic' | 'clientLogic' | '';

export default function App() {
    const [gameMode, setGameMode] = useState<GameModeTypes>('');
    return (
        <div>
            <div>
                <Button variant="primary" onClick={() => setGameMode('clientLogic')}>
                    Client Logic
                </Button>
                <Button variant="primary" onClick={() => setGameMode('serverLogic')}>
                    Server Logic
                </Button>
            </div>
            {gameMode === 'clientLogic' && <MineSweeper />}
            {gameMode === 'serverLogic' && <MineSweeperServer />}
        </div>
    );
}
