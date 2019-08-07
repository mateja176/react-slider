import { range } from 'ramda';
import React from 'react';

const circleSize = 10;

const CustomSlider: React.FC<{
  startIndex?: 0;
  width?: number;
  height?: number;
}> = ({ children, startIndex = 0, width = 1000, height = 800 }) => {
  const [activateIndex, setActiveIndex] = React.useState<number>(startIndex);

  return (
    <div
      style={{
        width,
        height,
        background: 'lightblue',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {React.Children.map(children, (child, i) => {
        return (
          <div
            style={{
              width,
              height,
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translateX(${(i - activateIndex) * width}px)`,
              transition: 'all 0.5s ease-in-out',
            }}
          >
            {child}
          </div>
        );
      })}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          marginBottom: 20,
        }}
      >
        {React.Children.map(children, (_, i) => {
          return (
            <div
              style={{
                width: circleSize,
                height: circleSize,
                borderRadius: '50%',
                background: activateIndex === i ? '#19b2d2' : 'white',
                marginRight: circleSize,
                cursor: 'pointer',
              }}
              onClick={() => {
                setActiveIndex(i);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
const App: React.FC = () => {
  return (
    <div>
      <CustomSlider>
        {range(0, 3).map(i => (
          <div
            key={i}
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {i}
          </div>
        ))}
      </CustomSlider>
      {/* <SimpleSlider /> */}
    </div>
  );
};

export default App;
