import React from 'react'
import { MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import SearchBox from './SearchBox';

type Props = {}

export default function Navbar({}: Props) {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
            <span className="flex items-center  justify-center gap-2">
                <h2 className="text-blue-600 text-3xl ">Weather</h2>
                <MdWbSunny className="w-full text-3xl mt-1 text-yellow-500" />
            </span>    
            
                <section className="flex gap-2 items-center">
                <MdMyLocation className='text-2xl text-gray-400 hover:text-sky-400'/>
                <MdOutlineLocationOn className='text-3xl hover:text-red-700'/>
                <p className='text-slate-900/80 text-sm-bold'>Portugal</p>
                <div>
                  <SearchBox />
                </div>
                </section>










        </div>
    </nav>
  );
}