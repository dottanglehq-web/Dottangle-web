import { waitUntil } from '@vercel/functions';
import { createServerlessHandler } from '../server/serverless.js';
export default createServerlessHandler({ schedule: promise => waitUntil(promise) });
