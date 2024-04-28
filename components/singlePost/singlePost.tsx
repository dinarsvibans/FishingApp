'use client';

import { TimeStampToTime } from '../../utils/timestampsConvert';
import { TimeStampToDate } from '../../utils/timestampsConvert';
import { TimestringToDateObject } from '../../utils/relativeTime';
import { RealtiveTime } from '../../utils/relativeTime';
import { Fish } from '../../types/Fish';
import { UserType } from '../../types/User';
import { useState, useEffect } from 'react';
import style from './singlePost.module.css';
import Image from 'next/image';
import axios from 'axios';

type Props = {
  postId: string;
  userId: string;
};

const SingePostComponent = (props: Props) => {
  console.log('props', props);
  const { postId, userId } = props;

  const [postData, setPostData] = useState<Fish | null>(null);
  const [userData, setUserData] = useState<UserType | null>(null);
  console.log('postData', postData);
  console.log('userData', userData);
  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const res = await axios.get(`/api/post/${userId}/${postId}`);
        setPostData(res.data.fish);
        setUserData(res.data.user);
        console.log(postData);
      } catch (error) {
        console.log(error, 'error occored fetching single post');
      }
    };
    fetchSinglePost();
  }, []);

  return (
    <div className={style.bodyContainer}>
      <div className='container'>
      {postData && userData && (
        <div className={style.contentSplit}>
          <div className={style.tableWrap}>
            <table className="table table-light">
              <tbody>
                <tr>
                  <td>Fisherman name</td>
                  <td>
                    <p>
                      {userData.name} {userData.surname}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>Name of the fish</td>
                  <td>
                    <p>{postData.fishName}</p>
                  </td>
                </tr>
                <tr>
                  <td>Fish weight in KG</td>
                  <td>
                    <p>{postData.fishWeight}</p>
                  </td>
                </tr>
                <tr>
                  <td>Bite</td>
                  <td>
                    <p>{postData.biteName}</p>
                  </td>
                </tr>
                <tr>
                  <td>Length of the fish in CM</td>
                  <td>
                    <p>{postData.fishLength}</p>
                  </td>
                </tr>
                <tr>
                  <td>Time</td>
                  <td>
                    <span>{TimeStampToDate(postData.createdAt)} /</span>
                    <span> {TimeStampToTime(postData.createdAt)}</span>
                  </td>
                </tr>
                <tr>
                  <td>Type of fishing line</td>
                  <td>{postData.fishingLineType}</td>
                </tr>
                <tr>
                  <td>Fishing rod length in CM</td>
                  <td>{postData.fishingRodLength}</td>
                </tr>
                <tr>
                  <td>Fishing rod model</td>
                  <td>{postData.fishingRodName}</td>
                </tr>
                <tr>
                  <td>Fishing rod test in G</td>
                  <td>{postData.fishingRodTest}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={style.imageWrapper}>
            <Image
              src={postData.photo}
              alt="Fish"
              fill
              priority
              objectFit="contain"
              className={style.image}
            />
          </div>
        </div>
        
        
      )}
      </div>
    </div>
  );
};
export default SingePostComponent;
