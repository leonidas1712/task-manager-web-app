import React from 'react';
import './App.css';
import Sidebar from './features/sidebar/Sidebar';
import { Container } from 'react-bootstrap';
import { sidebarWidth } from './Constants';
import { Outlet } from 'react-router-dom';
import PageWrapper from './PageWrapper';
import Spacer from './Spacer';


function App() {
  return (
      <div className="App">
        <Sidebar/>
        <Container style={{marginLeft: sidebarWidth}}>
          <PageWrapper>
            <Outlet />
            <Spacer />
          </PageWrapper>
        </Container>
      </div>
  );
}

export default App;
