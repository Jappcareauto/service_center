import { useState } from 'react';

const Switch = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`
        relative 
        w-[50px] 
        h-8 
        rounded-full 
        transition-colors 
        duration-300 
        focus:outline-none
        ${enabled ? 'bg-[#FF7E5F]' : 'bg-gray-200'}
      `}
    >
      <span
        className={`
          absolute 
          left-1 
          top-1 
          w-6 
          h-6 
          bg-white 
          rounded-full 
          shadow-md 
          transform 
          transition-transform 
          duration-300 
          ${enabled ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  );
};

export default Switch;