import React from 'react'
import { Link } from 'react-router-dom'

const Threadcard = ({
	id,
	currentUserId,
	parentId,
	content,
	author,
	community,
	createdAt,
	comments,
	isComment,
  }) => {

  return (
	<article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : " bg-zinc-950 p-7"
      }`}
    >
	<div className='flex items-start justify-between'>
	  <div className='flex w-full flex-1 flex-row gap-4'>
		<div className='flex flex-col items-center'>
		  <Link to={`/profile/${author.id}`} className='relative h-11 w-11'>
		  
			<img
			  src={author.avatar}
			  alt='user_community_image'
			  className='cursor-pointer rounded-full'
			/>
		  </Link>

		  <div className='relative mt-2 w-0.5 grow rounded-full bg-neutral-800' />

		</div>

		<div className='flex w-full flex-col'>
		  <Link to={`/profile/${author.id}`} className='w-fit'>
			<h4 className='cursor-pointer font-bold text-base'>
			  {author.username}
			</h4>
		  </Link>

		  <p className='mt-2 text-sm  text-light-2'>{content}</p>

		  <div className=" mt-5 flex flex-col gap-3">
			<div className='flex gap-3.5'>
			  <img
				src='/assets/heart-gray.svg'
				alt='heart'
				width={24}
				height={24}
				className='cursor-pointer object-contain'
			  />
			  <Link to={`/thread/${id}`}>
				<img
				  src='/assets/reply.svg'
				  alt='heart'
				  width={24}
				  height={24}
				  className='cursor-pointer object-contain'
				/>
			  </Link>
			  <img
				src='/assets/repost.svg'
				alt='heart'
				width={24}
				height={24}
				className='cursor-pointer object-contain'
			  />
			  <img
				src='/assets/share.svg'
				alt='heart'
				width={24}
				height={24}
				className='cursor-pointer object-contain'
			  />
			</div>

			
		  </div>
		</div>
	  </div>

	  
	</div>


	
  </article>
  )
}

export default Threadcard