import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() { 
    return(
        <div className="flex bg-red-700 h-16 content-center">
            <div className='flex items-center gap-4 hover:bg-emerald-300 hover:text-xl'>
                <h1 className="flex text-center">HI</h1>
                <h2>hola</h2>
            </div>
        </div>
    )
}
