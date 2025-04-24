import React, { useState } from 'react'
import Tab from '../_components/tab'
import FloatingInput from '@/components/commons/float-input';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
  return (
    <div className="max-w-lg mx-auto mt-[97px] mb-[202px] px-4 md:px-0">
      <Tab />
      <form className="flex flex-col space-y-4">
        <FloatingInput
          label="Username"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FloatingInput
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FloatingInput
          label="Password"
          type="password"    
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className='text-[#767676] text-sm not-italic font-normal leading-[24px] '>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.</p>
        <button
          type="submit"
          className="bg-primary text-[#FFF] text-sm not-italic font-medium leading-[24px]  py-[15px] hover:bg-primary-dark "
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register