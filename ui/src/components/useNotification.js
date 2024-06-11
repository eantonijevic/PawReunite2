import { useState, useEffect } from 'react';

const useNotification = () => {
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        // Check if there's a notification stored in localStorage
        const storedNotification = localStorage.getItem('notification');
        if (storedNotification) {
            setNotification(JSON.parse(storedNotification));
        }
    }, []);

    const showNotification = (message) => {
        const newNotification = {
            message,
            timestamp: new Date().toLocaleString(),
        };
        setNotification(newNotification);

        // Store the notification in localStorage
        localStorage.setItem('notification', JSON.stringify(newNotification));
    };

    const dismissNotification = () => {
        setNotification(null);
        localStorage.removeItem('notification');
    };

    return [notification, showNotification, dismissNotification];
};

export default useNotification;