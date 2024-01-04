import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImportantInfoCard = ({ title, subtitle }) => {
  return (
    <div className='flex-1 block mx-2 max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow'>
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-black'>{title}</h5>
      <p className='text-xs text-gray-500'>{subtitle}</p>
    </div>
  );
};

const ImportantInfoList = () => {
  const [importantInformation, setImportantInfotion] = useState([]);

    useEffect(() => {
      const fetchImportantInformation = async () => {
        try {
          const response = await axios.get('http://localhost:5000/importantInformation');
          setImportantInfotion(response.data);
        } catch (error) {
          console.error('Error fetching announcements:', error);
        }
      };

      fetchImportantInformation();
    }, []);

  const rows = [];
  const cardsPerRow = 4;

  for (let i = 0; i < importantInformation.length; i += cardsPerRow) {
    const row = importantInformation.slice(i, i + cardsPerRow);
    rows.push(
      <div key={i / cardsPerRow} className='flex justify-center my-5 mx-20'>
        {row.map((importantInformation, index) => (
          <ImportantInfoCard key={index} {...importantInformation} />
        ))}
      </div>
    );
  }

  return <>{rows}</>;
};

export default ImportantInfoList;
