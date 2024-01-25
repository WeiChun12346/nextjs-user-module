import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { UserFormData } from '../interfaces/userInterface';

const initialFormData: UserFormData = {
    name: '',
    email: '',
    dateOfBirth: null,
    password: '',
};

interface FormProps {
    onSubmit: (formData: UserFormData) => void;
    data?: UserFormData;
    isEdit?: boolean;
}

const UserFormComponent: React.FC<FormProps> = ({ onSubmit, data, isEdit = false }) => {
    const [formData, setFormData] = useState<UserFormData>(
        initialFormData
    );

    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleChange = (
        name: keyof UserFormData,
        value: string | Date | null
    ): void => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        onSubmit(formData)
    };

    const handleCancel = (): void => {
        setFormData(initialFormData);
    };

    return (
        <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-600">
                    Date of Birth:
                </label>
                <ReactDatePicker
                    selected={formData.dateOfBirth}
                    onChange={(date: any) => handleChange('dateOfBirth', date)}
                    placeholderText="Select a date"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    wrapperClassName="w-full"
                    dateFormat="dd/MM/yyyy"
                    onKeyDown={(e) => {
                        e.preventDefault();
                    }}
                    required
                />
            </div>
            {isEdit ? null : (
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>
            )}
            <div className="text-center space-x-4">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Submit
                </button>
                <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default UserFormComponent