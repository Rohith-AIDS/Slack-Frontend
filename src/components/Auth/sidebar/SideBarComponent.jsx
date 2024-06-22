import React from 'react'
import { Menu } from 'semantic-ui-react'
import "../sidebar/SideBarComponent.css"
import UserInfoComponent from './UserInfo/UserInfoComponent'
import ChannelComponent from './Channels/ChannelComponent'
import PrivateChatComponent from './PrivateChat/PrivateChat.component'
import ParentComponent from '../../ParentComponent/ParentComponent'




const SideBarComponent = () => {
  return (
    <Menu vertical fixed='left' borderless size="large" className='side_bar'>
        <UserInfoComponent/>
        <ChannelComponent/>
        <PrivateChatComponent/>
    </Menu>
  )
}

export default SideBarComponent
