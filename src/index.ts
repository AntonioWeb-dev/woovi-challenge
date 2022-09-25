import './config/module-alias';
import dotenv from 'dotenv';

dotenv.config();

import '@infra/database/mongodb';
import '@infra/adapters/graphql';