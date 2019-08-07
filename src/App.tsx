import { range } from 'ramda';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const CustomSlide: React.FC<
  { i: number } & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
> = ({ i, ...props }) => {
  return (
    <div
      {...props}
      style={{
        height: '60vh',
        background: 'lightcoral',
        display: 'grid',
        alignItems: 'center',
        justifyItems: 'center',
      }}
    >
      <h3>{i}</h3>
    </div>
  );
};

const circleSize = 10;

const playSpeed = 2000;

const SimpleSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <main
      style={{
        background: '#eee',
        width: '60vw',
      }}
    >
      <h2>React Slick Slider</h2>
      <Slider
        autoplay
        autoplaySpeed={playSpeed}
        afterChange={setActiveIndex}
        arrows={false}
        pauseOnHover={false}
        dots
        appendDots={dots => {
          return (
            <div
              style={{
                bottom: 0,
              }}
            >
              {dots}
            </div>
          );
        }}
        customPaging={i => {
          return (
            <div
              style={{
                height: circleSize,
                width: circleSize,
                borderRadius: '50%',
                background: i === activeIndex ? '#19b2d2' : 'white',
              }}
            />
          );
        }}
      >
        {range(1, 4).map(i => (
          <CustomSlide key={i} i={i} />
        ))}
      </Slider>
    </main>
  );
};

const App: React.FC = () => {
  return <SimpleSlider />;
};

export default App;
