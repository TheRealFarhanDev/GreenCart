import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'


const InputField = ({ type, placeholder, name, onChange, address }) => {
    return (
        <input
            className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none focus:border-primary text-gray-500 transition'
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={address[name]}
            required
        />
    )
}

const AddAddresses = () => {
    const { axios, user, navigate, loadingUser } = useAppContext();
    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: ""
    })

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/address/add', { address });
            if (data.success) {
                toast.success(data.message);
                navigate("/cart");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(!loadingUser && !user){
            navigate("/");
        }
    },[navigate, user, loadingUser])

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value })
    }

    return (<>
        <div className='mt-8 md:mt-16 pb-12'>
            <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-primary'>Address</span></p>
        </div>
        <div className='flex flex-col-reverse md:flex-row justify-between gap-8'>
            <div className='flex-1 max-w-md'>
                <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
                    <div className='grid grid-cols-2 gap-3'>
                        <InputField
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            onChange={handleChange}
                            address={address}
                        />
                        <InputField
                            type="text"
                            placeholder="LastName"
                            name="lastName"
                            onChange={handleChange}
                            address={address}
                        />

                    </div>

                    <InputField
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        address={address}
                    />
                    <InputField
                        type="text"
                        placeholder="Street"
                        name="street"
                        onChange={handleChange}
                        address={address}
                    />

                    <div className='grid grid-cols-2 gap-4'>
                        <InputField
                            type="text"
                            placeholder="City"
                            name="city"
                            onChange={handleChange}
                            address={address}
                        />
                        <InputField
                            type="text"
                            placeholder="State"
                            name="state"
                            onChange={handleChange}
                            address={address}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField
                            type="text"
                            placeholder="ZipCode"
                            name="zipCode"
                            onChange={handleChange}
                            address={address}
                        />
                        <InputField
                            type="text"
                            placeholder="Country"
                            name="country"
                            onChange={handleChange}
                            address={address}
                        />
                    </div>

                    <InputField
                        type="text"
                        placeholder="Phone"
                        name="phone"
                        onChange={handleChange}
                        address={address}
                    />
                    <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>Save Address</button>
                </form>
            </div>
            <div className="flex justify-center md:justify-end">
                <img
                    className="w-full max-w-xs md:max-w-sm object-contain"
                    src={assets.add_address_iamge}
                    alt="Add Address"
                />
            </div>
        </div>
    </>

    )
}

export default AddAddresses
