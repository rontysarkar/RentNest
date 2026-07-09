import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path:path.join(process.cwd(),'.env')});

export const config = {
    port:process.env.PORT,
    clint_url:process.env.CLIENT_URL,
    database_url:process.env.DATABASE_URL,
    bcrypt_salt:process.env.BCRYPT_SALT!,
    jwt_access_token_secret:process.env.JWT_ACCESS_TOKEN_SECRET!,
    jwt_access_token_expires_in:process.env.JWT_ACCESS_TOKEN_EXPIRES_IN!,
    jwt_refresh_token_secret:process.env.JWT_REFRESH_TOKEN_SECRET!,
    jwt_refresh_token_expires_in:process.env.JWT_REFRESH_TOKEN_EXPIRES_IN!,

    stripe_secret_key:process.env.STRIPE_SECRET_KEY,
    stripe_webhook_secret:process.env.STRIPE_WEBHOOK_SECRET
}
