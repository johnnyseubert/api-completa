import { config } from 'dotenv';
import { server } from './server';
config();

const port = process.env.SERVER_PORT || 4444;

server.listen(port, () => {
   console.log(`Server is running... ${port}`);
});
