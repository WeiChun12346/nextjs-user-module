import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='border-b mb-5 px-5 h-14 py-3'>
        <ul>
            <li><Link href="/users" className='text-lg'>User</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar