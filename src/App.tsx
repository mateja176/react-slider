import { range } from 'ramda';
import React from 'react';
import CustomSlider from './CustomSlider';

const App: React.FC = () => {
  return (
    <div>
      <CustomSlider slideDuration={2000}>
        {range(0, 3).map(i => (
          <div
            key={i}
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '5em',
              background: 'linear-gradient(to right, tomato, royalblue)',
            }}
          >
            {i}
          </div>
          // <img src="https://placeimg.com/1000/800" alt={i.toString()} />
        ))}
      </CustomSlider>
      {/* <SimpleSlider /> */}
    </div>
  );
};

export default App;
