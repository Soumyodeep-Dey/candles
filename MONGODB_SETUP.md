# MongoDB Integration Setup

This guide explains how to set up and use MongoDB with your candles e-commerce application.

## Prerequisites

1. **MongoDB Installation**: 
   - **Local MongoDB**: Install MongoDB locally from [mongodb.com](https://www.mongodb.com/try/download/community)
   - **MongoDB Atlas**: Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)

## Environment Setup

1. **Create Environment File**:
   ```bash
   # The .env.local file is already created with the following structure:
   ```

2. **Update MongoDB Connection String**:
   
   **For Local MongoDB**:
   ```env
   MONGODB_URI=mongodb://localhost:27017/candles
   DB_NAME=candles
   ```
   
   **For MongoDB Atlas**:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/candles?retryWrites=true&w=majority
   DB_NAME=candles
   ```

## Database Setup

1. **Install Dependencies** (already done):
   ```bash
   npm install mongodb mongoose @types/mongoose tsx
   ```

2. **Seed the Database**:
   ```bash
   npm run seed-db
   ```
   This command will:
   - Connect to your MongoDB database
   - Clear any existing candles data
   - Insert all the products from your static data
   - Create necessary indexes for better performance

## Project Structure

```
lib/
├── mongodb.ts              # MongoDB connection utility
├── models/
│   └── Candle.ts          # Mongoose model for candles
├── candle-service.ts      # Database service layer
└── products.ts            # Product types and static data

app/api/
├── candles/
│   ├── route.ts           # GET /api/candles, POST /api/candles
│   ├── [id]/route.ts      # GET, PUT, DELETE /api/candles/:id
│   ├── featured/route.ts  # GET /api/candles/featured
│   └── search/route.ts    # GET /api/candles/search?q=query

scripts/
└── seed-db.ts             # Database seeding script
```

## API Endpoints

### Get All Candles
```http
GET /api/candles
```

### Get Candle by ID
```http
GET /api/candles/:id
```

### Create New Candle
```http
POST /api/candles
Content-Type: application/json

{
  "id": "unique-id",
  "name": "Candle Name",
  "description": "Description",
  "price": 29.99,
  "images": ["image1.jpg"],
  "category": "scented",
  "scentType": "floral",
  "size": "medium",
  "burnTime": "40-45 hours",
  "inStock": true,
  "featured": false
}
```

### Update Candle
```http
PUT /api/candles/:id
Content-Type: application/json

{
  "price": 24.99,
  "inStock": false
}
```

### Delete Candle
```http
DELETE /api/candles/:id
```

### Get Featured Candles
```http
GET /api/candles/featured
```

### Search Candles
```http
GET /api/candles/search?q=lavender
```

## Service Layer Methods

The `CandleService` class provides the following methods:

- `getAllCandles()`: Fetch all candles
- `getCandleById(id)`: Fetch a specific candle
- `createCandle(data)`: Create a new candle
- `updateCandle(id, data)`: Update an existing candle
- `deleteCandle(id)`: Delete a candle
- `getFeaturedCandles()`: Get featured candles only
- `getCandlesByCategory(category)`: Filter by category
- `searchCandles(query)`: Text search across name, description, category, and scent type
- `getCandlesByPriceRange(min, max)`: Filter by price range

## Frontend Integration

The frontend has been updated to fetch data from the API instead of static files:

1. **Products Page** (`/products`): Fetches all candles with loading states
2. **Product Detail Page** (`/products/:id`): Fetches individual candle data
3. **Error Handling**: Proper error states and loading indicators

## Database Collections

### Candles Collection
- **Collection Name**: `candles`
- **Indexes**:
  - `id`: Unique index
  - `category`: Single field index
  - `featured`: Single field index
  - Text index on `name` and `description` for search

## Development Workflow

1. **Start MongoDB** (if using local installation)
2. **Run the seed script** (first time only or when you want to reset data):
   ```bash
   npm run seed-db
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```

## Production Deployment

For production deployment:

1. **Use MongoDB Atlas** for managed database hosting
2. **Set environment variables** in your hosting platform (Vercel, Netlify, etc.)
3. **Ensure connection string security** - use strong passwords and IP whitelisting

## Error Handling

The application includes comprehensive error handling:

- **Database connection errors**
- **Invalid product IDs (404 responses)**
- **Server errors (500 responses)**
- **Loading states in the frontend**
- **Graceful fallbacks**

## Performance Considerations

- **Connection pooling**: MongoDB connections are properly pooled
- **Indexes**: Strategic indexes for common queries
- **Lean queries**: Using `.lean()` for better performance when possible
- **Error boundaries**: Proper error handling throughout the application

## Troubleshooting

### Common Issues

1. **Connection refused**: Check if MongoDB is running (local) or connection string is correct (Atlas)
2. **Authentication failed**: Verify username/password in Atlas connection string
3. **Network errors**: Check firewall settings and IP whitelist in Atlas
4. **Seeding fails**: Ensure the database is accessible and the connection string is correct

### Debug Commands

```bash
# Check if MongoDB is running (local)
mongosh

# Test connection with environment variables
node -e "console.log(process.env.MONGODB_URI)"

# View logs
npm run dev # Check terminal for error messages
```

This setup provides a robust, scalable database foundation for your candles e-commerce application!