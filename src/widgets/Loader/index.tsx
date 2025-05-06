import dynamic from 'next/dynamic';

const Full = dynamic(() => import('./Full'), { ssr: false });
const Local = dynamic(() => import('./Local'), { ssr: false });

const Loader = {
  Local,
  Full,
};

export default Loader;
