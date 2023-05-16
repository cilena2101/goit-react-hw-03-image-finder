import axios from 'axios';

export async function fetchImages(inputData, page) {
  const searchParams = new URLSearchParams({
    q: inputData,
    key: '34991567-d238450fbc6c73abfee575a58',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page,
  });
  const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);

  return images.data;
}