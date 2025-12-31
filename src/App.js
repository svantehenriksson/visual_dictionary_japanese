import React, { useState, useEffect, useRef } from 'react';
import ImageList from './ImageList';
import Quiz from './Quiz';

import { supabase } from "./supabaseClient";

import './App.css';
import { topics } from './topics';

import AuthGate from "./AuthGate";


function App() {
  const topicKeys = Obj0ect.keys(topics);
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

// Put this near the top of your App component (inside function App() { ... })
const didMountRef = useRef(false);

useEffect(() => {
  // 1) guard: skip the very first render
    if (!didMountRef.current) {
        didMountRef.current = true;
            return;
              }

                // 2) guard: don’t log empty topic
                  if (topicIndex===0) return;

                    // 3) log to Supabase (explicitly wired, no magic)
                      (async () => {
                          // get current user (works even if you don't pass session down)
                              const {
                                    data: { user },
                                          error: userError,
                                              } = await supabase.auth.getUser();

                                                  if (userError) {
                                                        console.error("Failed to get user:", userError.message);
                                                              return;
                                                                  }

                                                                      // guard: must be logged in
                                                                          if (!user) return;

                                                                              const { error } = await supabase.from("topic_events").insert([
                                                                                    {
                                                                                            user_id: user.id,
                                                                                                    topic: topicIndex,
                                                                                                            // created_at can be omitted if your DB has default now()
                                                                                                                  },
                                                                                                                      ]);

                                                                                                                          if (error) {
                                                                                                                                console.error("Failed to log topic event:", error.message);
                                                                                                                                    }
                                                                                                                                      })();
                                                                                                                                      }, [topicIndex]);


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