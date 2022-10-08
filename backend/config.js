import {config} from 'dotenv'

config()

export const PORT = process.env.PORT || 4000
export const DB_URL = process.env.DB_URL || 'mongodb://localhost/test'

