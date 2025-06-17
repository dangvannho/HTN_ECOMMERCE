import { NavLink } from 'react-router-dom'

const Tab = () => {

  return (
    <div className="flex justify-center gap-10 mb-5 text-base not-italic font-medium">
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive
            ? 'border-b-2 border-primary px-2 py-1 '
            : 'text-gray-500 hover:text-gray-700 px-2 py-1'
        }
      >
        LOGIN
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          isActive
            ? 'border-b-2 border-primary px-2 py-1'
            : 'text-gray-500 hover:text-gray-700 px-2 py-1'
        }
      >
        REGISTER
      </NavLink>
    </div>
  )
}

export default Tab