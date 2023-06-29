import React from 'react';
import "./UserProducts.scss";
import { lessonList } from '../../../../data/LessonList';
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const UserProducts = ({ user }) => {
  const userLessons = lessonList.filter((e) => user?.lessons?.includes(e.path))
  const navigate = useNavigate();
  return (
    <div className="user-products py-5 px-5 col-12 col-md-8">
      <h2 className='pb-2'>Aldığınız dərslər</h2>
      {user &&
        <div className="row">
          {userLessons && userLessons?.map((item) => (
            <button onClick={() => navigate(`/lessons/${item.path}`)} key={item.id} className="col-12 py-4 py-md-0  col-md-6 clean-button single-lesson">
              <img src={item.image} alt="aa" className='w-100 h-100' />
              <div className="lesson-detail px-2">
                <h6>{item.title}</h6>
                <AiOutlineRight />
              </div>
            </button>
          ))}
        </div>}
    </div>
  )
}

export default UserProducts;