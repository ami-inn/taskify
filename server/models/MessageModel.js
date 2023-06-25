import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat'
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const messageModel = mongoose.model('Message', messageSchema);
export default messageModel;