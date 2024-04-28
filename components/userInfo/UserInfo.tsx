'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Fish } from '../../types/Fish';
import Image from 'next/image';
import style from './Userinfo.module.css';
import Link from 'next/link';
import { UserType } from '../../types/User';
import { RealtiveTime } from '../../utils/relativeTime';

const UserInfo = () => {
  const { data: session } = useSession();

  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [fishInfo, setFishInfo] = useState<Fish[] | null>(null);
  console.log('userInfo', userInfo);
  console.log('fishInfo', fishInfo);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = (session?.user as { _id?: string })?._id ?? '';
        console.log('userId', userId);
        if (userId) {
          const res = await fetch(`api/userinfo`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
          });

          if (!res.ok) {
            throw new Error('Failed to fetch user information');
          }

          const data = await res.json();
          setUserInfo(data.userInfo);
          setFishInfo(data.fishes);
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchData();
  }, [session]);

  return (
    <div className={style.bodyContainer}>
      <div className={style.container}>
        <h2>Your latest catches</h2>
        <hr />
        <div className={style.fishGrid}>
          {fishInfo &&
            fishInfo.map((fish, index) => (
              <Link
              key={index}
              href={`/post/${fish.user}/${fish._id}`}
              className={style.fishCell}
            >
            
                <div className={style.dateAndTime}>
                  {' '}
                  <span>{fish.fishName}</span>
                  {fish.createdAt && (
                    <span>{RealtiveTime(new Date(fish.createdAt))}</span>
                  )}
                </div>

                <div className={style.fishCellImage}>
                  <Image
                    src={fish.photo}
                    alt="Fish"
                    fill
                    priority
                    objectFit="cover"
                    className={style.image}
                  />
                </div>
              
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
