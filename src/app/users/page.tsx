"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { DataTable } from './data-table';
import { columns } from './columns';
import { useRouter } from 'next/navigation';
import { deleteUser, getUsers } from '../api/users/route';

const UsersForm = () => {
	const router = useRouter();
	const [data, setData] = useState<any[]>([])
	const actions = [
		{
			label: 'Edit',
			onClick: (rowData: any) => {
				router.push(`users/${rowData.id}`)
			},
			className: "bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
		},
		{
			label: 'Delete',
			onClick: async (rowData: any) => {
				await deleteUser(rowData.id)
				await refreshPage();
			},
			className: "bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
		},
	];
	useEffect(() => {
		const getUsers = async () => {
        		await refreshPage();
        };
        if (data.length <= 0) {
            getUsers();
        }
    }, [data]);

	const refreshPage = async () => {
		try {
			const response = await getUsers();
			const datas: any = await response.data;
			setData(datas);
		} catch (error) {
			console.error('Error fetching Users:', error);
		}
	}
	return (
		<div className='px-10'>
			<div className="text-right space-x-4">
				<button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"><Link href="/users/create">Create</Link></button>
			</div>
			<h1>User Listing</h1>
			<DataTable columns={columns} data={data} actions={actions} />
		</div>
	);
};

export default UsersForm;
