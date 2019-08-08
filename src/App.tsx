import { range } from 'ramda';
import React from 'react';

const circleSize = 10;

const CustomSlider: React.FC<{
  startIndex?: 0;
  width?: number;
  height?: number;
  slideDuration?: number;
}> = ({
  children,
  startIndex = 0,
  width = 1000,
  height = 800,
  slideDuration,
}) => {
  const [activateIndex, setActiveIndex] = React.useState<number>(startIndex);
  const [lastActivateIndex, setLastActiveIndex] = React.useState<number>(
    startIndex,
  );

  const [reset, setReset] = React.useState(true);
  const toggleReset = () => setReset(newReset => !newReset);

  const childCount = React.Children.count(children);

  React.useEffect(() => {
    if (slideDuration) {
      const interval = setInterval(() => {
        setActiveIndex(activateIndex => {
          setLastActiveIndex(activateIndex);

          return (activateIndex + 1) % childCount;
        });
      }, slideDuration);

      return () => {
        clearInterval(interval);
      };
    }
  }, [reset]);

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
        const offset = i - activateIndex;

        const isOnTheEdge = Math.abs(offset) + 1 === childCount;

        const isToTheRight = Math.sign(offset);

        return (
          <div
            onClick={toggleReset}
            style={{
              width,
              height,
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translateX(${(isOnTheEdge ? -isToTheRight : offset) *
                width}px)`,
              transition:
                i === activateIndex || i === lastActivateIndex
                  ? 'all 0.5s ease-in-out'
                  : '',
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
                setLastActiveIndex(activateIndex);
                setActiveIndex(i);
                toggleReset();
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
            }}
          >
            {i}
          </div>
          // <img src="https://placeimg.com/1000/800" alt={i.toString()} />
          //   <div
          //     style={{
          //       height: '100%',
          //       background: 'linear-gradient(to right, tomato, royalblue)',
          //     }}
          //   />
        ))}
      </CustomSlider>
      {/* <SimpleSlider /> */}
    </div>
  );
};

export default App;
