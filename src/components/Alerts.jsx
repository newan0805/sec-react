import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Alert = ({ message, onClose, status }) => {
    // console.log(status.status)
    // const [status, setStatus] = useState(null);
    useEffect(() => {
        const timeout = setTimeout(() => {
            onClose();
        }, 6000);

        return () => clearTimeout(timeout);
    }, [onClose]);

    const alertClassName = `alert alert-${status || 'primary'}`;
    
    return (
        <div className={alertClassName} role="alert">
            {message}
        </div>
    );
};

export default Alert;
