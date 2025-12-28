import React, { useState } from 'react';
import ImageList from './ImageList';
import Quiz from './Quiz';

import './App.css';
import { topics } from './topics';

import AuthGate from "./AuthGate";


function App() {
  const topicKeys = Object.keys(topics);
  const [view, setView] = useState('home'); // start at home
  const [topicIndex, setTopicIndex] = useState(0);
  const [showTopicMenu, setShowTopicMenu] = useState(false);

  const currentTopicKey = topicKeys[topicIndex];
  const currentTopic = topics[currentTopicKey];
  const { name, wordsAndImages } = currentTopic;

  const handleTopicSelect = (index) => {
    setTopicIndex(index);
    setView('imagelist');
    setShowTopicMenu(false);
  };

  return (
    <AuthGate>

    <div className="app">
      {view === 'home' && (
        <div className="home-page">
          <h1 className="header">視覚辞典 — Shikaku jite</h1>
          <h1 className="header">Visual Dictionary</h1>

              <div className="dictionary-bounce">
                <img src={`${process.env.PUBLIC_URL}/dictionary.png`} alt="dictionary" className="dictionary-image" />
              </div>
          <div className="topic-list">
            {topicKeys.map((key, idx) => (
              <div
                key={key}
                className="topic-option"
                onClick={() => handleTopicSelect(idx)}
              >
                {topics[key].name}
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'imagelist' && (
        <>
          <h1 className="header">{name}</h1>
          <ImageList wordsAndImages={wordsAndImages} />
        </>
      )}

      {view === 'quiz' && (
        <>
          <h1 className="header">{name}</h1>
          <Quiz wordsAndImages={wordsAndImages} />
        </>
      )}

      {view !== 'home' && (
        <div style={{ textAlign: 'center', margin: '2rem' }}>
          {view !== 'quiz' && (
            <button className="quiz-button" onClick={() => setView('quiz')}>❓Quiz❓</button>
          )}
          {view === 'quiz' && (
            <button className="quiz-button" onClick={() => setView('imagelist')}>🔙 Takaisin – Back</button>
          )}
          <div style={{ marginTop: '1.5rem', position: 'relative' }}>
            <button className="quiz-button" onClick={() => setShowTopicMenu(!showTopicMenu)}>
              🔄 トピックを変更 — Topikku o henkō – Change topic
            </button>
            {showTopicMenu && (
              <div className="topic-dropdown">
                {topicKeys.map((key, idx) => (
                  <div
                    key={key}
                    className={`topic-option ${idx === topicIndex ? 'active' : ''}`}
                    onClick={() => handleTopicSelect(idx)}
                  >
                    {topics[key].name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: '2rem' }}>
          <button className="quiz-button" onClick={() => setView('home')}>🏠 ホームに戻る — Hōmu ni modoru – Home</button>
        </div>
        </div>
      )}
    </div>

    </AuthGate>

  );
}

export default App;





/*
// App.js
import React, { useState } from 'react';
import ImageList from './ImageList';
import Quiz from './Quiz';

import './App.css';

import { topics } from './topics';

function App() {
  const topicKeys = Object.keys(topics);
  const [view, setView] = useState('imagelist');
  const [topicIndex, setTopicIndex] = useState(0);
  const [showTopicMenu, setShowTopicMenu] = useState(false);

  const currentTopicKey = topicKeys[topicIndex];
  const currentTopic = topics[currentTopicKey];
  const { name, wordsAndImages } = currentTopic;

  const handleTopicSelect = (index) => {
    setTopicIndex(index);
    setShowTopicMenu(false);
    setView('imagelist'); // Reset view to image list when changing topic
  };

  return (
    <div className="app">
      <h1 className="header">{name}</h1>

      {view === 'imagelist' && <ImageList wordsAndImages={wordsAndImages} />}
      {view === 'quiz' && <Quiz wordsAndImages={wordsAndImages} />}

      <div style={{ textAlign: 'center', margin: '2rem' }}>
        {view !== 'quiz' && (
          <button className="quiz-button" onClick={() => setView('quiz')}>❓Quiz❓</button>
        )}
        {view === 'quiz' && (
          <button className="quiz-button" onClick={() => setView('imagelist')}>🔙 Takaisin – Back</button>
        )}

        <div style={{ marginTop: '1.5rem', position: 'relative' }}>
          <button className="quiz-button" onClick={() => setShowTopicMenu(!showTopicMenu)}>
            🔄 Vaihda aihetta – Change topic
          </button>

          {showTopicMenu && (
            <div className="topic-dropdown">
              {topicKeys.map((key, idx) => (
                <div
                  key={key}
                  className={`topic-option ${idx === topicIndex ? 'active' : ''}`}
                  onClick={() => handleTopicSelect(idx)}
                >
                  {topics[key].name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;


/*
import React, { useState } from 'react';
import ImageList from './ImageList';
import Quiz from './Quiz';

import './App.css';

import { topics } from './topics';

function App() {
  const topicKeys = Object.keys(topics);
  const [view, setView] = useState('imagelist');
  const [topicIndex, setTopicIndex] = useState(0);
  const [showTopicMenu, setShowTopicMenu] = useState(false);

  const currentTopicKey = topicKeys[topicIndex];
  const { name, words } = topics[currentTopicKey];

  const handleTopicSelect = (index) => {
    setTopicIndex(index);
    setShowTopicMenu(false);
  };

  return (
    <div className="app">
      <h1 className="header">{name}</h1>
      {view === 'imagelist' && <ImageList wordsAndImages={words} />}
      {view === 'quiz' && <Quiz wordsAndImages={words} />}

      <div style={{ textAlign: 'center', margin: '2rem' }}>
        {view !== 'quiz' && (
          <button className="quiz-button" onClick={() => setView('quiz')}>❓Quiz❓</button>
        )}
        {view === 'quiz' && (
          <button className="quiz-button" onClick={() => setView('imagelist')}>🔙 Takaisin – Back</button>
        )}

        <div style={{ marginTop: '1.5rem', position: 'relative' }}>
          <button className="quiz-button" onClick={() => setShowTopicMenu(!showTopicMenu)}>
            🔄 Vaihda aihetta – Change topic
          </button>

          {showTopicMenu && (
            <div className="topic-dropdown">
              {topicKeys.map((key, idx) => (
                <div
                  key={key}
                  className={`topic-option ${idx === topicIndex ? 'active' : ''}`}
                  onClick={() => handleTopicSelect(idx)}
                >
                  {topics[key].name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;


*/