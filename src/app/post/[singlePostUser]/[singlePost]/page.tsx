'use client'

import SingePostComponent from '../../../../../components/singlePost/singlePost';

interface SinglePostProps {
  params: {
    singlePost: string;
    singlePostUser: string;
  };
}

const SingePost = ({ params }: SinglePostProps) => {
  console.log('params',params);
  const { singlePost, singlePostUser } = params;

  return (
      <div>
        <SingePostComponent postId = {singlePost} userId = {singlePostUser}/>
      </div>
  );
};

export default SingePost;
