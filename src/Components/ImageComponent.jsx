import React, { useState, useEffect } from 'react'

import axios from 'axios'

import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

const ImageComponent = ({ fileId, customClasses }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true)

  // Fetch the blob URL from the server using Axios
  useEffect(() => {
    axios
      .get(`https://cybersmartserver.as.r.appspot.com/GetImage/${fileId}`, { responseType: 'blob' })
      .then(response => {
        // Create a blob URL from the fetched blob
        const blobUrl = URL.createObjectURL(response.data);
        setImageUrl(blobUrl);
        setIsLoading(false)
      })
      .catch(error => console.error('Error fetching image:', error));
  }, [fileId]);

  return (
    <>
    {isLoading ? (
      <Skeleton customClass={customClasses} />
    ) : (
      <img src={imageUrl} alt="Decrypted Image" className={customClasses} />
    )}
  </>
  );
};

export default ImageComponent;