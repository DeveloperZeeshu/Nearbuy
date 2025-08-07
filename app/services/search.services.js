import { db } from "../config/db_client.js"
import { sql } from "drizzle-orm"

export const getNearbyShops = async (userLat, userLon, radiusInMeters = 5000, query, category) => {
    const whereConditions = [
        sql`ST_Distance_Sphere(POINT(shops.longitude, shops.latitude), POINT(${userLon}, ${userLat})) < ${radiusInMeters}`
    ]

    if (query) {
        whereConditions.push(sql`products.name LIKE ${'%' + query + '%'}`)
    }

    if (category) {
        whereConditions.push(sql`products.category = ${category}`)
    }

    const whereClause = sql`WHERE ${sql.join(whereConditions, sql` AND `)}`

    const [products] = await db.execute(
        sql`
        SELECT 
        products.*,
        shops.shop_name AS shop_name,
        shops.latitude AS latitude,
        shops.longitude AS longitude,
        shops.address AS shop_address,
        shops.phone AS shop_phone,
        ST_Distance_Sphere(
          POINT(shops.longitude, shops.latitude),
          POINT(${userLon}, ${userLat})
        ) AS shop_distance
      FROM shops
      JOIN products ON shops.id = products.shop_id
      ${whereClause}
      ORDER BY shop_distance;        `
    );
    return products
}


