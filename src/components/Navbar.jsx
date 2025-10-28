import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-violet-800 text-white'>
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className='logo font-bold text-2xl'>

            <span className='text-yellow-500'> &lt;</span>
            <span>Keep</span><span className='text-yellow-500'>R/&gt;</span>

            </div>
      {/* <ul>
        <li className='flex gap-4'>
           <a className='hover:font-bold' href='/'>Home</a>
           <a className='hover:font-bold' href='#'>About</a>
           <a className='hover:font-bold' href='#'>Contact</a>
        </li>
      </ul> */}
      <button className='text-white bg-yellow-500 my-5 rounded-full flex gap-2 justify-between items-center px-4 py-2 hover:bg-yellow-400 ring-offset-white ring-2'onClick={() => window.open("https://github.com/parmeettsingh", "_blank")}>
            <img className='w-5 h-5' src="/icons/github.svg" alt="logo" />
         <span className='font-bold px-2'>Github</span>
      </button> 
      </div>
    </nav>
  )
}

export default Navbar
