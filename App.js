// App.js
import React, { useState } from 'react';
import ImageList from './ImageList';
import Quiz from './Quiz';
import './App.css'; // or wherever you define the header style


function App() {
  const [view, setView] = useState('imagelist');

  return (
    <div className="app">
      <h1 className='header'>Tunteet - emotions</h1>
      {view === 'imagelist' && <ImageList />}
      {view === 'quiz' && <Quiz />}
      <div style={{ textAlign: 'center', margin: '2rem' }}>
        {view !== 'quiz' && (
          <div style={{ textAlign: 'center', margin: '2rem' }}>
            <button className="quiz-button" onClick={() => setView('quiz')}>
              ❓Quiz❓
            </button>
          </div>
        )}
          {view === 'quiz' && (
          <div style={{ textAlign: 'center', margin: '2rem' }}>
            <button className="quiz-button" onClick={() => setView('imagelist')}>
              🔙 Takaisin
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;