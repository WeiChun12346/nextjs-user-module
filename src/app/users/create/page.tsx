"use client";
import moment from 'moment';
import UserFormComponent from '@/app/components/userForm'
import { UserFormData } from '@/app/interfaces/userInterface';
import { createUser } from '@/app/api/users/route';

const initialFormData: UserFormData = {
    name: '',
    email: '',
    dateOfBirth: null,
    password: '',
};

const CreateUserForm = () => {
    const handleSubmit = async (formData: UserFormData) => {
        const formattedDate = formData.dateOfBirth
            ? moment(formData.dateOfBirth).startOf('day').toISOString()
            : null;
        await createUser({ ...formData, dateOfBirth: formattedDate })
    };

    return (
        <div>
            <h1 className='text-center'>Create Page</h1>
            <UserFormComponent data={initialFormData} onSubmit={handleSubmit} />
        </div>
    );
};

export default CreateUserForm;
