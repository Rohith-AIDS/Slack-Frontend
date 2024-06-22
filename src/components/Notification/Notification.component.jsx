import React from 'react';
import { Label } from 'semantic-ui-react';

export const Notification = (props) => {
    // This function calculates notification count based on props (currently static UI)
    const calculateNotificationCount = () => {
        // For static UI, you can return a predefined count or null for no notifications
        // Example:
        const notificationCount = 3; // Example static notification count

        return notificationCount === 0 ? null : <Label color="red">{notificationCount}</Label>;
    };

    return (
        <>
            {props.displayName}
            {calculateNotificationCount()}
        </>
    );
};
