import React from 'react'
import UserCard from './components/userCard'
import SettingsSection from './components/settingsSection'

const MyAccountPage = () => {
  return (
    <>
        <div className='w-full h-full'>
            <UserCard/>
            <SettingsSection/>
        </div>
    </>
  )
}

export default MyAccountPage
