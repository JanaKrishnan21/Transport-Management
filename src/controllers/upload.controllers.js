// controllers/uploadController.js
import cloudinary from '../utils/cloudinary.js';

export const uploadProfilePhoto = async (req, res) => {
  try {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'student_profiles' },
      (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error);
          return res.status(500).json({ error: 'Upload failed' });
        }
        res.json({ url: result.secure_url });
      }
    );

    stream.end(req.file.buffer);
  } catch (err) {
    console.error("Upload controller error:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const uploadDriverProfilePhoto = async (req, res) => {
  try {
    const driverId = req.params.driverId; // pass driverId in route

    const stream = cloudinary.uploader.upload_stream(
      { folder: 'driver_profiles' },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error);
          return res.status(500).json({ error: 'Upload failed' });
        }

        // Update DB with Cloudinary URL
        const driver = await Driver.findOne({ where: { user_id: driverId } });
        if (!driver) return res.status(404).json({ error: "Driver not found" });

        await driver.update({ profile_photo: result.secure_url });

        res.json({ url: result.secure_url });
      }
    );

    stream.end(req.file.buffer);
  } catch (err) {
    console.error("Upload controller error:", err);
    res.status(500).json({ error: 'Server error' });
  }
};