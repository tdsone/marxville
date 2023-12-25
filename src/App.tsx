import Game from './components/Game.tsx';

import { ToastContainer } from 'react-toastify';
import a16zImg from '../assets/a16z.png';
import convexImg from '../assets/convex.svg';
import starImg from '../assets/star.svg';
import helpImg from '../assets/help.svg';
import { UserButton } from '@clerk/clerk-react';
import { Authenticated, Unauthenticated } from 'convex/react';
import LoginButton from './components/buttons/LoginButton.tsx';
import { useState } from 'react';
import ReactModal from 'react-modal';
import MusicButton from './components/buttons/MusicButton.tsx';
import Button from './components/buttons/Button.tsx';
import InteractButton from './components/buttons/InteractButton.tsx';
import FreezeButton from './components/FreezeButton.tsx';
import { MAX_HUMAN_PLAYERS } from '../convex/constants.ts';
import PoweredByConvex from './components/PoweredByConvex.tsx';

export default function Home() {
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  return (
    <main className="relative flex flex-col items-center justify-between min-h-screen font-body game-background">
      <ReactModal
        isOpen={helpModalOpen}
        onRequestClose={() => setHelpModalOpen(false)}
        style={modalStyles}
        contentLabel="Help modal"
        ariaHideApp={false}
      >
        <div className="font-body">
          <h1 className="text-6xl font-bold text-center font-display game-title">Help</h1>
          <p>
            Frohe Weihnachten und wilkommen in Marxville. In Marxville kannst du sowohl anonym
            zuschauen als auch Teil des Geschehens werden!
          </p>
          <h2 className="mt-4 text-4xl">Zuschauen</h2>
          <p>
            Click and drag to move around the town, and scroll in and out to zoom. You can click on
            an individual character to view its chat history.
          </p>
          <h2 className="mt-4 text-4xl">Teil des Geschehens werden</h2>
          <p>
            If you log in, you can join the simulation and directly talk to different agents! After
            logging in, click the "Interact" button, and your character will appear somewhere on the
            map with a highlighted circle underneath you.
          </p>
          <p className="mt-2 text-2xl">Controls:</p>
          <p className="mt-4">Click to navigate around.</p>
          <p className="mt-4">
            To talk to an agent, click on them and then click "Start conversation," which will ask
            them to start walking towards you. Once they're nearby, the conversation will start, and
            you can speak to each other. You can leave at any time by closing the conversation pane
            or moving away. They may propose a conversation to you - you'll see a button to accept
            in the messages panel.
          </p>
          <p className="mt-4">
            AI town only supports {MAX_HUMAN_PLAYERS} humans at a time. If you're idle for five
            minutes, you'll be automatically removed from the simulation.
          </p>
        </div>
      </ReactModal>
      <div className="absolute top-0 right-0 z-10 p-3 text-2xl">
        <Authenticated>
          <UserButton afterSignOutUrl="/ai-town" />
        </Authenticated>

        <Unauthenticated>
          <LoginButton />
        </Unauthenticated>
      </div>

      <div className="relative flex flex-col justify-start w-full min-h-screen p-3 overflow-hidden shadow-2xl isolate lg:p-8">
        <h1 className="w-full mx-auto text-4xl font-bold leading-none tracking-wide text-left sm:text-8xl lg:text-9xl font-display game-title sm:text-center sm:w-auto">
          Marxville
        </h1>

        <div className="max-w-xs mx-auto my-4 text-base leading-tight text-center text-white md:max-w-xl lg:max-w-none sm:text-xl md:text-2xl shadow-solid">
          Eine KI Stadt, die von virtuellen Kommunisten bewohnt wird.
          <Unauthenticated>
            <div className="my-1.5 sm:my-0" />
            Logge dich ein, um Teil der Stadt zu werden
            <br className="block sm:hidden" /> und an der Konversation teilzunehmen.
          </Unauthenticated>
        </div>

        <Game />

        <footer className="absolute bottom-0 left-0 flex flex-wrap items-center w-full gap-3 p-6 mt-4 pointer-events-none">
          <div className="flex flex-grow gap-4 pointer-events-none">
            <FreezeButton />
            <MusicButton />
            <InteractButton />
            <Button imgUrl={helpImg} onClick={() => setHelpModalOpen(true)}>
              Info
            </Button>
          </div>
        </footer>
        <ToastContainer position="bottom-right" autoClose={2000} closeOnClick theme="dark" />
      </div>
    </main>
  );
}

const modalStyles = {
  overlay: {
    backgroundColor: 'rgb(0, 0, 0, 75%)',
    zIndex: 12,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '50%',

    border: '10px solid rgb(23, 20, 33)',
    borderRadius: '0',
    background: 'rgb(35, 38, 58)',
    color: 'white',
    fontFamily: '"Upheaval Pro", "sans-serif"',
  },
};
