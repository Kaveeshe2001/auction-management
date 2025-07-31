import './select.css';

type Option = {
    value: string;
    label: string;
}

type SelectProps = {
    label?: string;
    placeHolder?: string;
    name: string;
    id: string;
    options: Option[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ label, name, id, options, onChange }: SelectProps) => {
  return (
    <div className='form-inner'>
      {label && <label htmlFor={id}>{label}</label>}
      <select name={name} id={id} onChange={onChange}>
        <option value='0' className='selecting-items'>
            Select Your Choice
        </option>
        {options.map((option, index) => (
            <option value={option.value} key={index} className='selecting-items'>
                {option.label}
            </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
