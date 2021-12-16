import { getYoutubeVideoById } from "../../lib/videos";

const getVideoById = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const video = await getYoutubeVideoById(id);
      if (video.length > 0) {
        res.json(video);
      } else {
        res.json({message: 'Id not found'})
      }
    } else {
      res.status(400).json({ message: 'Id is missing' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', err });
  }
}

export default getVideoById;