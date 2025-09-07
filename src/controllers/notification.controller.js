export const sendNotification = async (req, res) => {
  try {
    const { title, message, to } = req.body;

    res.json({
      success: true,
      sentTo: to || 'all',
      title,
      message,
      timestamp: new Date()
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send notification' });
  }
};