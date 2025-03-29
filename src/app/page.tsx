import LayoutWrapper from '@/components/LayoutWrapper';
import Carousel from '@/widgets/Carousel';

const Home = () => {
  return (
    <div className="flex justify-center">
      <LayoutWrapper className="flex">
        <div className="flex h-[80vh] flex-1 items-center justify-center border border-red-500">
          Manga stacks come here
        </div>
        <div className="flex h-[80vh] flex-1 items-center justify-center">
          <Carousel />
        </div>
      </LayoutWrapper>
    </div>
  );
};

export default Home;
