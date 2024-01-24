"use client";
import moment from 'moment';
import UserFormComponent from '@/app/components/userForm'
import { UserFormData } from '@/app/interfaces/userInterface';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserById, updateUser } from '@/app/api/users/route';

const initialFormData: UserFormData = {
    name: '',
    email: '',
    dateOfBirth: null,
    password: '',
};

const UpdateUserForm = (data: any) => {
    const router = useRouter();
    const { id } = data.params;
    const [initialValues, setInitialValues] = useState<UserFormData>(initialFormData);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await getUserById(id);
                const data: UserFormData = await response.data;
                setInitialValues({
                    ...data,
                    dateOfBirth: moment(data.dateOfBirth).toDate(),
                });
            } catch (error) {
                console.error('Error fetching User:', error);
            }
        };

        if (id) {
            getUser();
        }
    }, [id]);

    const handleUpdate = async (formData: UserFormData) => {
        const formattedDate = formData.dateOfBirth
            ? moment(formData.dateOfBirth).startOf('day').toISOString()
            : null;
        await updateUser(id, { ...formData, dateOfBirth: formattedDate })
        router.push('/users');
    };

    return (
        <div>
            <h1 className='text-center'>Detail Page</h1>
            <UserFormComponent onSubmit={handleUpdate} data={initialValues} />
        </div>
    );
};

export default UpdateUserForm;
