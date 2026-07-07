import express, { Application, Request, Response } from 'express'
import { authRoutes } from './modules/auth/auth.routes';
import { propertyRoutes } from './modules/property/property.routes';
import { categoryRoutes } from './modules/category/category.routes';
import { landlordRoutes } from './modules/landlord/landlord.routes';
import { rentalRoutes } from './modules/rental/rental.routes';


const app :Application = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/auth',authRoutes)
app.use('/api/properties',propertyRoutes)
app.use('/api/categories',categoryRoutes)

app.use('/api/landlord',landlordRoutes)
app.use('/api/rentals',rentalRoutes)

// app.use('/api/payments')
// app.use('/api/reviews')

// app.use('/api/admin')

export default app;