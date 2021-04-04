const dev = process.env.Node_ENV !== 'production';
export const server = dev ? "http://192.168.1.10:7071": "http://192.168.1.10:7071";