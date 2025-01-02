import React from 'react'

const Usercard = ({ id, name, username, email, imgUrl, personType }) => {
  return (
	<article className='flex flex-col justify-between gap-4 max-xs:rounded-xl max-xs:bg-dark-3 max-xs:p-4 xs:flex-row xs:items-center'>
      <div className='flex flex-1 items-start justify-start gap-3 xs:items-center'>
        <div className='relative h-12 w-12'>
          <img
            src={imgUrl}
            alt='user_logo'
            className='rounded-full object-cover'
          />
        </div>

        <div className='flex-1 '>
          <h4 className=''>{name}</h4>
          <p className=''>@{username}</p>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>

      
    </article>
  )
}

export default Usercard