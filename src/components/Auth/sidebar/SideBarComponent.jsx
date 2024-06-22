import React from 'react'
import { Menu } from 'semantic-ui-react'
import "../sidebar/SideBarComponent.css"
import UserInfoComponent from './UserInfo/UserInfoComponent'
import ChannelComponent from './Channels/ChannelComponent'



const SideBarComponent = () => {
  return (
    <Menu vertical fixed='left' borderless size="large" className='side_bar'>
        <UserInfoComponent/>
        <ChannelComponent/>
    </Menu>
  )
}

export default SideBarComponent