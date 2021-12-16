import jwt from 'jsonwebtoken';
import { verifyToken } from '../../lib/utils';
import { findVideoIdByUser, updateStats, insertStats } from '../../lib/db/hasura';

const stats = async (req, res) => {
  try { 
    const token = req.cookies.token;
    if (token) {
      const inputParams = req.method === "POST" ? req.body : req.query;
      const { videoId } = inputParams;
      if (videoId) {
        const userId = await verifyToken(token);
        const findVideo = await findVideoIdByUser(token, userId, videoId);
        const doesStatsExist = findVideo?.length > 0;

        if (req.method === 'POST') {
          const { favourited, watched = true, saved } = req.body;
          if (doesStatsExist) {
            const response = await updateStats(token, {
              watched,
              saved,
              userId,
              videoId,
              favourited
            });
            res.send({data: response});
          } else {
            // res.send({msg: 'insert data'})
            const response = await insertStats(token, {
              watched,
              saved,
              userId,
              videoId,
              favourited,
            });
            res.send({data: response});
          
          }
        } else {
          if (doesStatsExist) {
            res.send(findVideo)
          } else {
            res.status(404).send({user: null, msg: 'Video not found'});
          }
        }
      } else {
        res.status(400).send({ msg: 'Video id is missing' });
      }
    } else {
      res.status(403).send({});
    }
  } catch (error) {
    console.error('Error occurred /stats', error);
    res.status(500).send({done: false, error: error?.message});
  }
}

export default stats;