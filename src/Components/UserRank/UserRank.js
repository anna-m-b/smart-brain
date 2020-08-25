import React from 'react';

const UserRank = ({ name, entries }) => {
  return (
    <div>
      <div className='white f3'>
        {`${name}, you've face-checked`}
      </div>
      <div className='white f1'>
      {entries}
      </div>
      <div className='white f3'>
      {'photos'}
    </div>
    </div>
  );
}

export default UserRank;