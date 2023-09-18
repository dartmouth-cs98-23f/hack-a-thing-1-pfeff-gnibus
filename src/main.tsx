import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Instructions from './Instructions';
import './index.css';
import { Provider } from 'react-redux'
import { store } from './store'
import { Divider } from 'antd';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <header className='header'>
        <h1>Calendarize</h1>
        <p className='header-subtext'>Course calendar generator for Dartmouth students</p>
      </header>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/instructions" element={<Instructions />} />
      </Routes>
      <Divider />
      <footer className='footer'>
        <p className='header-subtext'>Have feedback? Let us know how we can improve at <a href="mailto:calendarizedartmouth@gmail.com">calendarizedartmouth@gmail.com</a></p>
      </footer>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
