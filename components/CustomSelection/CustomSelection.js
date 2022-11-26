import React, { useEffect, useRef, useState } from 'react';
// import FormsContainer from '../'
const CustomSelection = ({
  optionsList,
  setSelectedOption,
  selectedOption,
  label,
}) => {
  const [isShown, setIsShown] = useState(false);
  // const [selectedRole, setSelectedRole] = useState('');
  const optionsRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    function handler(e) {
      if (
        !optionsRef.current.contains(e.target) &&
        !inputRef.current.contains(e.target)
      ) {
        setIsShown(false);
      }
    }
    addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const handleOptions = (role) => {
    setSelectedOption(role);
    setIsShown((preVal) => !preVal);
  };

  return (
    <FormsContainer>
      <Label label={label} />
      <div className='relative w-full'>
        <div>
          <input
            readOnly
            className='border text-base rounded-sm   focus:outline  outline-none px-2 py-3 capitalize w-full '
            type='text'
            onClick={() => setIsShown(!isShown)}
            value={selectedOption}
            ref={inputRef}
          />
        </div>
        <ul
          ref={optionsRef}
          className={`absolute bg-white border border-t-0 ${
            isShown ? 'flex' : 'hidden'
          } flex-col max-h-64 w-full `}
        >
          <input
            type='text'
            placeholder='Search'
            className='p-3 text-base border-b'
          />
          <div className='max-h-full overflow-y-scroll'>
            {optionsList.map((role, i) => (
              <li
                onClick={() => handleOptions(role)}
                className='capitalize  p-3 hover:bg-gray-200 w-full'
                key={i}
              >
                {role}
              </li>
            ))}
          </div>
        </ul>
      </div>
    </FormsContainer>
  );
};

export default CustomSelection;

const FormsContainer = ({ children }) => {
  return <div className='flex flex-col gap-2 max-w-[340px]'>{children}</div>;
};

const Label = ({ label, id }) => (
  <label className='text-gray-500 capitalize' htmlFor={id}>
    {label}
  </label>
);
