import './App.css';

import { IoIosClose } from 'react-icons/io';
import { Site } from './classes/three';
import { useEffect, useRef } from 'react';
function App() {
  const canva = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canva.current) {
      let site = new Site({ content: canva.current });
      site.render();
    }
  }, []);

  return (
    <>
      <div ref={canva} className="canvas relative h-screen w-1/2">
        <a className="font-base fixed right-10 top-10 flex items-center justify-center text-2xl opacity-60">
          {' '}
          close menu
          <IoIosClose
            style={{
              height: '4vh',
              scale: '2',
              marginTop: '5px',
            }}
          />
        </a>
        <div className="images absolute left-1/2 top-1/2 h-[32vw] w-[25vw] -translate-x-1/2 -translate-y-1/2">
          <img
            className="absolute h-full w-full object-cover"
            src="/images/first.jpg"
            alt=""
          />
          <img
            className="absolute h-full w-full object-cover"
            src="/images/second.jpg"
            alt=""
          />
          <img
            className="absolute h-full w-full object-cover"
            src="/images/third.jpg"
            alt=""
          />
          <img
            className="absolute h-full w-full object-cover"
            src="/images/fourth.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="relative flex h-screen w-1/2 items-center justify-center">
        <div className="links flex flex-col gap-10">
          <a
            href=""
            className="block text-left text-6xl lowercase tracking-tighter opacity-30 transition-all hover:ml-5 hover:opacity-100"
          >
            <small className="text-xl tracking-normal">01. </small>
            belto septacolo
          </a>
          <a
            href=""
            className="block text-left text-6xl lowercase tracking-tighter opacity-30 transition-all hover:ml-5 hover:opacity-100"
          >
            <small className="text-xl tracking-normal">02. </small>
            dolce for niente
          </a>
          <a
            href=""
            className="block text-left text-6xl lowercase tracking-tighter opacity-30 transition-all hover:ml-5 hover:opacity-100"
          >
            <small className="text-xl tracking-normal">03. </small>
            sofasticado
          </a>
          <a
            href=""
            className="block text-left text-6xl lowercase tracking-tighter opacity-30 transition-all hover:ml-5 hover:opacity-100"
          >
            <small className="text-xl tracking-normal">04. </small>
            magnifico
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
