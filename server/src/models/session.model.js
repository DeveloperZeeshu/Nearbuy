import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    valid: { type: Boolean, default: true, index: true },
    userAgent: { type: String, required: true },
    ip: { type: String, required: true },
    refreshToken: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } }
},
    {
        timestamps: true
    }
)

export default mongoose.model('Session', SessionSchema)

