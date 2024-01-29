"use client";
import Link from 'next/link';
import { useState } from 'react'
import { DataTable } from './data-table';
import { columns } from './columns';

const UsersForm = () => {
	const [isRefresh, setIsRefresh] = useState(false)
	const refreshPage = async (isRefresh = false) => {
		setIsRefresh(isRefresh)
	}
	return (
		<div className='px-10'>
			<div className='flex justify-between mb-3'>
				<h1 className='text-lg font-bold'>User Listing</h1>
				<div className="text-right space-x-4">
				<button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-300"
					onClick={() => refreshPage(true)}>
					Refresh
				</button>
				<button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"><Link href="/users/create">Create</Link></button>
			</div>
			</div>
			
			
			<DataTable columns={columns} setIsRefresh={setIsRefresh} isRefresh={isRefresh} />
		</div>
	);
};

export default UsersForm;
