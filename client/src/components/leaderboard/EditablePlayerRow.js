import React, { useState } from 'react';

const EditablePlayerRow = ({className, player, onClickSave, onClickDelete}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [score, setScore] = useState(player.score);

  const _onClickSave = () => {
    const form = {
      lastName: player.lastName,
      firstName: player.firstName,
      score: parseInt(score)
    };
    onClickSave(form).then(() => setIsEditing(false));
  };

  const _onClickCancel = () => {
    setIsEditing(false);
    setScore(player.score);
  };

  // poor man's form validation
  const isFormValid = score
                      && parseInt(score) >= 0 && parseInt(score) <= 100;

  return (
    <tr className={`player-row ${className}`}>
      <td className="border px-4 py-2">
        {player.lastName}, {player.firstName}
      </td>
      <td className="border px-4 py-2">
        {!isEditing && player.score}
        {isEditing && <input 
          value={score}
          onChange={e => setScore(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="score" 
          type="number" 
          min="0" 
          max="100" 
          placeholder="Score"/>
        }
      </td>
      <td className="border px-4 py-2">
        {!isEditing && <div className="flex">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 m-2 bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 border border-gray-400 rounded focus:outline-none focus:shadow-outline" 
              type="button">
              Edit
            </button>
            <button 
              onClick={onClickDelete}
              className="flex-1 m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
              type="button">
              Delete
            </button>
          </div>
        }
        {isEditing && <div className="flex">
            <button
              onClick={_onClickSave}
              className={`flex-1 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border rounded focus:outline-none focus:shadow-outline ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="button">
              Save
            </button>
            <button 
              onClick={_onClickCancel}
              className="flex-1 m-2 bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 border border-gray-400 rounded focus:outline-none focus:shadow-outline" 
              type="button">
              Cancel
            </button>
          </div>
        }
      </td>
    </tr>
  );
};

export default EditablePlayerRow;