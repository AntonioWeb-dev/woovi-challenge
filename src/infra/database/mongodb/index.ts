import mongoose from 'mongoose';
import { DB_URI } from '@config/enviromentVars';

mongoose.connect(DB_URI);
mongoose.connection.on('error', () => process.stdout.write('database connection error\n'));
mongoose.connection.once('open', () => process.stdout.write('database connected\n'));
