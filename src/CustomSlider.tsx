import React from 'react';

type Index = number;

const CustomSlider: React.FC<{
  startIndex?: Index;
  width?: number;
  height?: number;
  slideDuration?: number;
  circleSize?: number;
}> = ({
  children,
  startIndex = 0,
  width = 1000,
  height = 800,
  slideDuration,
  circleSize = 10,
}) => {
  const [{ current, previous }, setActive] = React.useState({
    current: startIndex,
    previous: startIndex,
  });

  const setActiveIndex = (index: Index) => {
    setActive({ current: index, previous: current });
  };
  const setActiveIndexAsync = (callback: (index: Index) => Index) => {
    setActive(active => ({
      previous: active.current,
      current: callback(active.current),
    }));
  };

  const [reset, setReset] = React.useState(true);
  const toggleReset = () => setReset(newReset => !newReset);

  const childCount = React.Children.count(children);

  React.useEffect(() => {
    if (slideDuration) {
      const interval = setInterval(() => {
        setActiveIndexAsync(oldCurrent => (oldCurrent + 1) % childCount);
      }, slideDuration);

      return () => {
        clearInterval(interval);
      };
    }
  }, [reset, childCount, slideDuration]);

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
        const offset = i - current;

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
                i === current || i === previous ? 'all 0.5s ease-in-out' : '',
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
                background: current === i ? '#19b2d2' : 'white',
                marginRight: circleSize,
                cursor: 'pointer',
              }}
              onClick={() => {
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

export default CustomSlider;
