// App.js
import React from 'react';
import { RecoilRoot } from 'recoil';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome CSS
import ChatApp from './pages/ChatApp';

const App = () => {
  return (
    <RecoilRoot>
      <div className="app-container">
        <ChatApp/>
      </div>
    </RecoilRoot>
  );
};

export default App;
