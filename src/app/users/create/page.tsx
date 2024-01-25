"use client";
import moment from 'moment';
import UserFormComponent from '@/app/components/userForm'
import { UserFormData } from '@/app/interfaces/userInterface';
import { createUser } from '@/app/api/users/route';
import { useRouter } from 'next/navigation';

const initialFormData: UserFormData = {
    name: '',
    email: '',
    dateOfBirth: null,
    password: '',
};

const CreateUserForm = () => {
    const router = useRouter();
    const handleSubmit = async (formData: UserFormData) => {
        const formattedDate = formData.dateOfBirth
            ? moment(formData.dateOfBirth).startOf('day').toISOString()
            : null;
        await createUser({ ...formData, dateOfBirth: formattedDate }).then(response => {
            console.log('Success:', response.data);
            router.push('/users');
        }).catch(error => {
            console.log('Error:', error);
        });
    };

    return (
        <div>
            <h1 className='text-center'>Create Page</h1>
            <UserFormComponent data={initialFormData} onSubmit={handleSubmit} />
        </div>
    );
};

export default CreateUserForm;
