export const timeoutRedirect = (history, path) => {
    const timer = setTimeout(() => {
        history.push(path);
        }, 3000);
    
    return () => clearTimeout(timer);
};