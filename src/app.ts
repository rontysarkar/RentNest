import express, { Application, Request, Response } from "express";
import { authRoutes } from "./modules/auth/auth.routes";
import { propertyRoutes } from "./modules/property/property.routes";
import { categoryRoutes } from "./modules/category/category.routes";
import { landlordRoutes } from "./modules/landlord/landlord.routes";
import { rentalRoutes } from "./modules/rental-request/rental-request.routes";
import cookieParser from "cookie-parser";
import { paymentRoutes } from "./modules/payments/payments.routes";
import { reviewRoutes } from "./modules/review/review.routes";
import { adminRoutes } from "./modules/admin/admin.routes";

const app: Application = express();

app.use('/api/payments/webhook',express.raw({type: 'application/json'}))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/properties", propertyRoutes);
app.use("/api/categories", categoryRoutes);


app.use("/api/auth", authRoutes);

app.use("/api/landlord", landlordRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/payments",paymentRoutes);
app.use('/api/reviews',reviewRoutes);
app.use('/api/admin',adminRoutes)

// app.use('/api/reviews')

// app.use('/api/admin')

export default app;
