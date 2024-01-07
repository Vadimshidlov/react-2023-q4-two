import { useUncontrolledFormSelector } from '@/Hooks/redux';

export default function MainFormPage() {
  const { data } = useUncontrolledFormSelector((state) => state.unControlledFormReducer);

  return (
    <div>
      <p>{data.file}</p>
      <p>{data.age}</p>
      <p>{data.country}</p>
      <p>{data.firstName}</p>
    </div>
  );
}
