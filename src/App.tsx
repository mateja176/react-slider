import { range } from 'ramda';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const CustomSlide: React.FC<{ i: number }> = ({ i, ...props }) => {
  return (
    <div
      {...props}
      style={{
        height: 800,
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

type Settings = React.ComponentProps<typeof Slider>;

const settings: Settings = {
  dots: true,
  infinite: true,
};

const SimpleSlider: React.FC = () => {
  return (
    <main
      style={{
        background: '#eee',
        width: '50vw',
      }}
    >
      <h2>Single Item</h2>
      <Slider {...settings}>
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
