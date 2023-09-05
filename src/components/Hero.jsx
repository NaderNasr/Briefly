import logo from '../assets/Frame.png';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <h1 className='font-satoshi text-2xl font-bold'>Briefly</h1>
        <button type='button' onClick={() => window.open('https://www.nadernasr.ca')} className='black_btn'>
          Portfolio
        </button>
      </nav>
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h1 className='head_text'>
          Revolutionizing Content Digestion Using <br className='max-md:hidden' />
          <span className='orange_gradient'>OpenAI GPT-4</span>
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className='desc mb-7'>
        An article summarization web app powered by OpenAI's GPT-4 model.
        </h2>
      </motion.div>
    </header>
  )
}

export default Hero