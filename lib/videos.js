import videoTestData from '../data/videos.json';
import { getMyListVideos, getWatchedVideos, getFavouritedVideos } from './db/hasura';

const fetchData = async (url) => {
  const BASE_URL = 'https://youtube.googleapis.com/youtube/v3'; 
  const response = await fetch(`${BASE_URL}/${url}&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`)
  return await response.json();
} 

const getVideos = async (url) => {
  try {
    const data = process.env.DEVELOPMENT ? videoTestData : await fetchData(url);
    
    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }

    return data?.items.map(item => {
      return {
        title: item.snippet?.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id: item.id?.videoId || item.id,
        description: item.snippet.description,
        publishTime: item.snippet.publishedAt.split('T')[0],
        channelTitle: item.snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
      };
    });
  } catch (err) {
    console.error("Something went wrong with video library", err);
    return [];
  }
};

export const getCommonVideos = (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}`;
  return getVideos(URL);
};

export const getPopularVideos = () => {
  const URL = 'videos?part=snippet&chart=mostPopular&regionCode=CA';
  return getVideos(URL);
}

export const getYoutubeVideoById = (videoId) => {
  if (process.env.DEVELOPMENT) {
    const video = videoTestData.items.find(item => item.id?.videoId === videoId || item.id === videoId)
    if (video) {
      return [{
        title: video.snippet?.title,
        imgUrl: video.snippet.thumbnails.high.url,
        id: video.id?.videoId || video.id,
        description: video.snippet.description,
        publishTime: video.snippet.publishedAt.split('T')[0],
        channelTitle: video.snippet.channelTitle,
        statistics: video.statistics ? video.statistics : { viewCount: 0 },
      }]
    } else {
      return [];
    }
  }
  const URL = `videos?part=snippet&id=${videoId}`;
  return getVideos(URL);
}

export const getMyList = async (userId, token) => {
  const videos = await getMyListVideos(userId, token);
  return videos?.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    };
  });
};

export const getLikedVideos = async (userId, token) => {
  const videos = await getFavouritedVideos(userId, token);
  return videos?.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    };
  });
};

export const getWatchAgainVideos = async (userId, token) => {
  const videos = await getWatchedVideos(userId, token);
  return videos?.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`,
    };
  });
};