import React from 'react';
import './App.css';

import AppHeader from './components/appHeader/AppHeader';
import UserTable from './components/userTable/UserTable';
import AppFooter from './components/appFooter/AppFooter';

function App() {
  return (
    <div className="App">
      <AppHeader/>

      <main className=''>
        <UserTable/>
      </main>

      <AppFooter/>
    </div>
  );
}

export default App;
