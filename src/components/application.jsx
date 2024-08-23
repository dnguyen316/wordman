import { useCallback, useMemo, useState } from 'react';
import generateRandomColor from '../lib/generate-random-color';
import ColorSwatch from './color-swatch';
import ExpensiveComponent from './expensive-component';
import GameInput from './game-input';
import GameStatus from './game-status';

const Application = () => {
  const [colorGuess, setColorGuess] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(() =>
    generateRandomColor(),
  );
  const [hasGuessed, setHasGuessed] = useState(false);
  const isWinner = useMemo(
    () => correctAnswer === colorGuess,
    [correctAnswer, colorGuess],
  );

  const handleResetColor = useCallback(() => {
    setCorrectAnswer(generateRandomColor());
    setHasGuessed(false);
    setColorGuess('');
  }, []);

  return (
    <main className="mx-auto my-8 flex w-96 flex-col gap-8">
      <ColorSwatch color={correctAnswer} />
      <GameInput
        value={colorGuess}
        onChange={(e) => setColorGuess(e.target.value)}
        onSubmit={() => setHasGuessed(true)}
        disabled={hasGuessed}
      />
      <GameStatus isWinner={isWinner} hasGuessed={hasGuessed} />
      <button
        onClick={handleResetColor}
        type={hasGuessed ? 'submit' : 'button'}
      >
        Reset Color
      </button>
      <ExpensiveComponent />
    </main>
  );
};

export default Application;
