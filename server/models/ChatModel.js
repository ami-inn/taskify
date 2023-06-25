import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
    {
        members: {
            type: Array
        },

        workspace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workspace'
          }
    },
    {
        timestamps: true
    }
);

const chatModel = mongoose.model('Chat', chatSchema);
export default chatModel;