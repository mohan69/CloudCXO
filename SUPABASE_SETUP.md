# Supabase Setup Guide for RightSense CXO Hub

## 🚀 Quick Setup Steps

### 1. Get Your Supabase Project Details

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your existing project or create a new one
3. Go to **Settings** → **API**
4. Copy your:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 2. Update Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values:

```env
# Replace with your actual Supabase project values
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here

# Admin credentials (you can customize these)
VITE_ADMIN_EMAIL=cloudcxo@rightsense.in
VITE_ADMIN_PASSWORD=@R1ghts2025
```

### 3. Set Up Database Tables

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase-setup.sql` and run it
4. This will create:
   - `cxos` table for CXO management
   - `business_requests` table for business requests
   - Row Level Security policies
   - Sample data

### 4. Create Admin User

1. In Supabase Dashboard, go to **Authentication** → **Users**
2. Click **"Add user"**
3. Enter:
   - **Email**: `cloudcxo@rightsense.in`
   - **Password**: `@R1ghts2025`
4. Check **"Auto confirm user"**
5. Click **"Create user"**

### 5. Test the Application

1. Run the development server:
   ```bash
   npm run dev
   ```
2. Navigate to `/login`
3. Use the admin credentials:
   - **Email**: `cloudcxo@rightsense.in`
   - **Password**: `@R1ghts2025`

## 🔧 What's Been Fixed

### ✅ Authentication Issues Resolved
- **Fixed conflicting AuthContext implementations**
- **Implemented proper Supabase authentication**
- **Admin login now works with real user validation**
- **Session persistence across page refreshes**

### ✅ Database Integration
- **Connected to Supabase database**
- **Real-time data saving and retrieval**
- **Proper database schema with relationships**
- **Row Level Security enabled**

### ✅ Data Flow
- **Stats are calculated from real database counts**
- **CXO management with full CRUD operations**
- **Business requests stored in Supabase**
- **Fallback data when database is not configured**

## 🏗️ Database Schema

### CXOs Table
```sql
- id (UUID, Primary Key)
- name (VARCHAR)
- email (VARCHAR, Unique)
- expertise (VARCHAR)
- experience (VARCHAR)
- status ('Active' | 'Pending' | 'Inactive')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Business Requests Table
```sql
- id (UUID, Primary Key)
- company (VARCHAR)
- requirement (TEXT)
- budget (VARCHAR)
- status ('Open' | 'In Progress' | 'Completed' | 'Closed')
- date (DATE)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 🔒 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Authenticated user policies** for data access
- **Secure authentication** with Supabase Auth
- **Environment variables** for sensitive configuration

## 🚀 Deployment

After setup, deploy with:
```bash
npm run build
npm run deploy
```

The application will be deployed to GitHub Pages at `https://cloudcxo.in`

## 📞 Troubleshooting

### Login Not Working?
1. Verify admin user is created in Supabase Auth
2. Check environment variables are correct
3. Ensure database tables exist

### Data Not Loading?
1. Check Supabase connection in browser console
2. Verify RLS policies are applied
3. Check API errors in network tab

### Build Errors?
1. Ensure all environment variables are set
2. Run `npm install` to update dependencies
3. Check TypeScript errors

---

**Need Help?** Check the Supabase documentation or the browser console for error messages.