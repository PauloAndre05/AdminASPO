import { useState } from "react";

const CardOne = () => {

  const urlAgendamentos = "http://localhost:5555/agendamento"
  const [dataAgendamento, setDataAgendamento] = useState([])

  const getAgendamento =async () => {
    try{
      const response = await fetch (urlAgendamentos)
      const responseData = await response.json()
      setDataAgendamento(responseData)
    }

    catch (error){
      console.log(error);
    }

  }
  getAgendamento()

  

  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
       
        <svg 
          className="fill-primary dark:fill-white" 
          xmlns="http://www.w3.org/2000/svg" 
          width="30" 
          height="30" 
          fill="none" 
          viewBox="0 0 256 256">
          <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"></path>
        </svg>

        
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {dataAgendamento?.length}
          </h4>
          <span className="text-sm font-medium">Total de agendas</span>
        </div>

        <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
          0.43%
          <svg
            className="fill-meta-3"
            width="10"
            height="11"
            viewBox="0 0 10 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
              fill=""
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default CardOne;
