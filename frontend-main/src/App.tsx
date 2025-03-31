// src/App.tsx
import React, { useState } from 'react';
import Header from './components/header';

const App: React.FC = () => {
  const [language, setLanguage] = useState<string>('en');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    console.log('선택된 언어:', e.target.value);
  };

  return (
    <div>
      <Header language={language} onLanguageChange={handleLanguageChange} />
      <main style={{ padding: '1rem' }}>
        <p>이곳에 번역될 텍스트가 나옵니다.</p>
      </main>
    </div>
  );
};

export default App;
