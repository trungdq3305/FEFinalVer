import styles from '../Header/Header.module.scss'

import React from 'react'
import logo from '../../assets/logo.jpg'
import CustomizedMenus from '../React-menu/ReactMenu'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/UserContext'

const Header = ({ handleCategory }) => {
  const navigate = useNavigate()
  const { logOut } = useAuth()
  const handleLogout = () => {
    const result = logOut()
  }
  const userStr = localStorage.getItem('user')
  const user = JSON.parse(userStr)
  const userId = user ? user.userId : null
  const handleNavigateToManageCustomer = () => {
    navigate('/StaffPage/StaffCustomer')
  }
  const handleNavigateToManageDiscount = () => {
    navigate('/StaffPage/StaffDiscount')
  }
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={styles.navbar}>
        <ul>
          <li>
            <button
              onClick={() => {
                navigate('/StaffPage')
              }}
            >
              <CustomizedMenus handleCategory={handleCategory} />
            </button>
          </li>
          <li>
            <Button
              onClick={() => {
                navigate('/StaffPage/Goldrate')
              }}
              sx={{
                backgroundColor: '#333',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#ffdbf0',
                  color: 'black',
                },
              }}
            >
              GOLD RATE
            </Button>
          </li>

          <li>
            <Button
              onClick={handleNavigateToManageDiscount}
              sx={{
                backgroundColor: '#333',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#ffdbf0',
                  color: 'black',
                },
              }}
            >
              DISCOUNT
            </Button>
          </li>
          <li>
            <Button
              onClick={handleNavigateToManageCustomer}
              sx={{
                backgroundColor: '#333',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#ffdbf0',
                  color: 'black',
                },
              }}
            >
              CUSTOMER
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                navigate('/History')
              }}
              sx={{
                backgroundColor: '#333',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#ffdbf0',
                  color: 'black',
                },
              }}
            >
              HISTORY
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                navigate('/PolicyPage')
              }}
              sx={{
                backgroundColor: '#333',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#ffdbf0',
                  color: 'black',
                },
              }}
            >
              POLICY
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                {
                  navigate(`/Profile/${userId}`)
                }
              }}
              sx={{
                backgroundColor: '#333',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#ffdbf0',
                  color: 'black',
                },
              }}
            >
              PROFILE{' '}
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                {
                  handleLogout()
                }
              }}
              sx={{
                backgroundColor: '#333',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#ffdbf0',
                  color: 'black',
                },
              }}
            >
              LOG OUT{' '}
            </Button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
