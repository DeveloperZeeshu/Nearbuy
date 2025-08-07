import { int, timestamp, serial, varchar, mysqlTable, text, double, boolean, decimal } from 'drizzle-orm/mysql-core'

export const shops = mysqlTable('shops', {
    id: int().autoincrement().primaryKey(),

    shopName: varchar('shop_name', { length: 100 }).notNull(),
    ownerName: varchar('owner_name', { length: 100 }).notNull(),
    email: varchar('email', { length: 100 }).unique().notNull(),
    password: varchar({ length: 255 }).notNull(),
    phone: varchar('phone', { length: 15 }).notNull(),

    address: varchar('address', { length: 100 }).notNull(),
    city: varchar('city', { length: 50 }).notNull(),
    state: varchar('state', { length: 50 }).notNull(),
    zipCode: varchar('zip_code', { length: 10 }).notNull(),
    latitude: double('latitude').notNull(),
    longitude: double('longitude').notNull(),

    imageUrl: text('image_url'),
    isVerified: boolean('is_verified').default(false),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
})

export const products = mysqlTable('products', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    description: varchar('description', { length: 255 }),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    isAvailable: boolean('is_available').default(true).notNull(),

    category: varchar('category', { length: 50 }),
    image: varchar('image', { length: 255 }),

    shopId: int('shop_id').notNull().references(() => shops.id, { onDelete: 'cascade' }),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
})

