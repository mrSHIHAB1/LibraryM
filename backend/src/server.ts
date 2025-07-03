import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app'
let server: Server;
const port = 5000;
async function main() {
    try {
        await mongoose.connect('mongodb+srv://todoapp:todoapp@cluster0.zignzkk.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to MongoDB');
        server = app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}
main();