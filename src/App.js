import { useState } from 'react';
import './App.css';
import Form from './Form';
import Header from './Header';
import Table from './Table';

function App() {

  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Header setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeTab === 0 &&  <Form /> }
      {activeTab === 1 && <Table />}
    </>
  );
}

export default App;
