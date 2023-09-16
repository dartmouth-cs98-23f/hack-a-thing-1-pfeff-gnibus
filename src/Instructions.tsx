import {Divider, Steps, Button, theme } from 'antd';
import { useState } from 'react';
import Step1 from './assets/step1.png'
import Step2 from './assets/step2.png'
import Step3 from './assets/step3.png'
import './index.css';

function Instructions() {
  const [current, setCurrent] = useState(0);
  const { token } = theme.useToken();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: 'Go to settings',
      content: <img src={Step1} alt="Go to settings" style={{ objectFit: 'cover', maxWidth: '100%' }} />      ,
    },
    {
      title: 'Choose import & export',
      content: <img src={Step2} alt="Choose import and export" style={{ objectFit: 'cover', maxWidth: '100%' }} />      ,
    },
    {
      title: 'Upload .ics file',
      content: <img src={Step3} alt="Select upload from computer" style={{ objectFit: 'cover', maxWidth: '100%' }} />      ,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    width: '100%', 
    height: 'fit-content',
    overflow: 'hidden',
    textAlign: 'center',
    color: token.colorTextTertiary,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  };
  
  return (
    <>
      <header className='header'>
        <h1>Calendarize</h1>
        <p className='header-subtext'>Calendar generator for Dartmouth students</p>
      </header>

      <Divider />

      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
}

export default Instructions;