import mongoose, { Document, Schema } from "mongoose";

export interface ISession extends Document {
    shopId: mongoose.Types.ObjectId
    valid: boolean
    userAgent: string
    ip: string
    refreshToken: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
}

const SessionSchema = new Schema<ISession>({
    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    valid: {
        type: Boolean,
        default: true,
        index: true
    },
    userAgent: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String, 
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 }
    }
},
    {
        timestamps: true
    }
)

export const Session = mongoose.model<ISession>('Session', SessionSchema)
export default Session
