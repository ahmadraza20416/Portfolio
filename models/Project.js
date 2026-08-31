import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: 'Full Stack' },
  techStack: [{ type: String }],
  features: [{ type: String }],
  imageUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  order: { type: Number, default: 1 },
  visible: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
