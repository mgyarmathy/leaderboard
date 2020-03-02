import React, { useState } from 'react';

const AddPlayerFooterRow = ({onClickSave}) => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [score, setScore] = useState('');

  const clearForm = () => {
    setLastName('');
    setFirstName('');
    setScore('');
  };

  const _onClickSave = () => {
    const form = {
      lastName,
      firstName,
      score: parseInt(score)
    };
    onClickSave(form).then(() => clearForm());
  };

  // poor man's form validation
  const isFormValid = lastName
                      && firstName
                      && score
                      && parseInt(score) >= 0 && parseInt(score) <= 100;

  return (
    <tr>
      <td className="py-2">
        <div className="flex">
          <input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className="flex-1 m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="lastname" 
            type="text" 
            placeholder="Last Name"/>
          <input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="flex-1 m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="firstname" 
            type="text" 
            placeholder="First Name"/>
        </div>
      </td>
      <td className="px-2 py-2">
        <input 
          value={score}
          onChange={e => setScore(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="score" 
          type="number" 
          min="0" 
          max="100" 
          placeholder="Score"/>
      </td>
      <td className="px-4 py-2">
        <button
          onClick={_onClickSave}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          type="button"
          disabled={!isFormValid}>
          Add Player
        </button>
      </td>
    </tr>
  );
};

export default AddPlayerFooterRow;