/* eslint-disable operator-linebreak */
import { NavLink } from 'react-router-dom';
import { useUncontrolledFormSelector } from '@/Hooks/redux';
import './MainFormPage.scss';

export default function MainFormPage() {
  const { data } = useUncontrolledFormSelector((state) => state.unControlledFormReducer);
  console.log(data, 'data');

  return (
    <div className="main-form__container">
      <h1 className="main-form__title">Submit Data</h1>

      <nav className="main-form__navbar navbar">
        <NavLink to="/cform" className="navbar__item">
          Controlled Form
        </NavLink>
        <NavLink to="/uform" className="navbar__item">
          Uncontrolled Form
        </NavLink>
      </nav>

      <div className="main-form__data data">
        {data.length === 0 && <div>There is no data!</div>}
        {data.length !== 0 &&
          data.map((formData, index) => {
            const imageSrc: string | undefined = formData.file;

            return (
              <div
                className={index === data.length - 1 ? 'data-item last-item' : 'data-item'}
                key={formData.firstName}
              >
                <img src={imageSrc} alt="avatar" className="data-item__picture" />
                <p>{`First Name: ${formData.firstName}`}</p>
                <p>{`Last Name: ${formData.lastName}`}</p>
                <p>{`Age: ${formData.age}`}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
