import React, { useState } from 'react'
import { subMenu } from './NavItems'
import { Link } from 'react-router-dom'
import "./dropdown.css";
const Dropdown = () => {
  const [dropDown, setdropDown] = useState(false);
  return (
    <>
      <ul className={dropDown ? 'services-submenu clicked' : 'services-submenu'}
        onClick={() => setdropDown(!dropDown)}
      >
        {subMenu.map((item, indec) => {
          return (
            <li>
              <Link to="/user/dashboard" className={item.cn}>  {item.title}</Link>
            </li>
          )
        })

        }
      </ul>
    </>
  )
}

export default Dropdown