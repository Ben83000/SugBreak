import { toast, Bounce } from 'react-toastify';

/**
 * Set a toast to notify something
 * @param {String} message to show
 * @param {String} mode: "warn", "info", "error", "success" 
 * @param {number} time to close (if necessary)
 */
export default function notify(message, mode, time){
    const options = {
        position: "bottom-right",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    }
    switch(mode)
    {
        case 'warn':
            toast.warn(`${message}`, options);
            break;
        case 'info':
            toast.info(`${message}`, options);
            break; 
        case 'error':
            toast.error(`${message}`, options);
            break;
        case 'success':
            toast.success(`${message}`, options);
            break;
        default:
            toast(`${message}`, options);
            break;
    }
}