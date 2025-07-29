type Step = {
    stepNo: number;
    stepType: string;
    desc: string;
    link: string;
};

type Props = {
    step: Step;
    right: boolean;
};

const Step = ({ step, right }: Props) => {
  const { stepNo, stepType, desc, link } = step;
  return (
    <>
      {link === '' ? (
        <div className={`step ${right ? 'two' : ''}`}>
            <span>Step {stepNo}</span>
            <h2>{stepType}</h2>
            <p>{desc}</p>
            <div className={`arrow ${right ? 'two' : ''}`}>
                <svg
                  width='11'
                  height='11'
                  viewBox='0 0 11 11'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M10.501 10.501L2.99848 10.501L2.99848 9.66931L9.07931 9.66931L0.498476 1.08897L1.08848 0.500977L9.66764 9.07965L9.66764 2.99515L10.501 2.99515L10.501 10.501Z'></path>
                </svg> 
            </div>
        </div>
      ) : (
        <a className={`step ${right ? 'two' : ''}`} href={link}>
            <span>Step {stepNo}</span>
            <h2>{stepType}</h2>
            <p>{desc}</p>
            <div className={`arrow ${right ? 'two' : ''}`}>
              <svg
                width='11'
                height='11'
                viewBox='0 0 11 11'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M10.501 10.501L2.99848 10.501L2.99848 9.66931L9.07931 9.66931L0.498476 1.08897L1.08848 0.500977L9.66764 9.07965L9.66764 2.99515L10.501 2.99515L10.501 10.501Z'></path>
              </svg>
            </div>
        </a>
      )}
    </>
  );
};

export default Step;
