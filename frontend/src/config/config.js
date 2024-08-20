const config = {
  apiUrl: import.meta.env.VITE_MODE === 'production'
    ? 'https://gentle-citadel-85847-6ce2d6bf71ee.herokuapp.com'
    : 'http://172.20.10.3:5000'
};

export default config;