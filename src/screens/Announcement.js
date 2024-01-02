import React from 'react';

const announcementsData = [
  {
    title: 'Announcement 1',
    content: 'Here are announcement 1 contents.',
  },
  {
    title: 'Announcement 2',
    content: 'Here are announcement 2 contents.',
  },
  {
    title: 'Announcement 3',
    content: 'Here are announcement 3 contents.',
  },
  {
    title: 'Announcement 4',
    content: 'Here are announcement 4 contents.',
  },
  {
    title: 'Announcement 5',
    content: 'Here are announcement 5 contents.',
  },
  {
    title: 'Announcement 6',
    content: 'Here are announcement 6 contents.',
  },
];

const Announcement = ({ title, content }) => {
  return (
    <div className='block mx-4 max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow'>
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-black'>{title}</h5>
      <p className='font-normal text-gray-500'>{content}</p>
    </div>
  );
};

const AnnouncementList = () => {
  const rows = [];
  const cardsPerRow = 3;

  for (let i = 0; i < announcementsData.length; i += cardsPerRow) {
    const row = announcementsData.slice(i, i + cardsPerRow);
    rows.push(
      <div key={i / cardsPerRow} className='flex justify-center mt-5'>
        {row.map((announcement, index) => (
          <Announcement key={index} {...announcement} />
        ))}
      </div>
    );
  }

  return <>{rows}</>;
};

export default AnnouncementList;
