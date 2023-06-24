import { useEffect, useState } from 'react';
/* 
import { Link } from 'react-router-dom'; 
import UserOne from '../images/user/user-01.png';
import UserTwo from '../images/user/user-02.png';
import UserThree from '../images/user/user-03.png';
import UserFour from '../images/user/user-04.png';
import UserFive from '../images/user/user-05.png';
 */

interface DataNewsLeter {

  id: string
  nome: string
  mensagem: string
}

const ChatCard = () => {
  
  const urlNewsleter = "http://localhost:5555/newsleter/"
  const [dataNewsleter, setDataNewsleter] = useState([])

  async function getNewsleter() {
    try {
      const response = await fetch(urlNewsleter);
      const data = await response.json();
      setDataNewsleter(data);
    } catch (error) {
      console.log("erro de requisição");
    }
  }

  useEffect(() => {
    getNewsleter();
  }, [])

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4 overflow-y-auto ">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Ultimos feedBack
      </h4>

      <div>

      {dataNewsleter.map((data: DataNewsLeter) => {
                // Dividir o nome completo em um array
                const nomeCompleto = data?.nome.split(" ");
                const primeiroNome = nomeCompleto[0];
                const ultimoNome = nomeCompleto[nomeCompleto.length - 2 + 1  ];
                const primeiraLetra = primeiroNome.charAt(0).toUpperCase();
        return(
        <div className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4" key={data?.id}>
          <div className="relative h-14 w-14 rounded-full bg-black flex items-center justify-center text-xl font-semibold">
            <span>{primeiraLetra}</span>
            
          </div>

          <div className="flex flex-1 items-center justify-between">
            <div>
              <h5 className="font-medium text-black dark:text-white">
                {primeiroNome} {ultimoNome}
              </h5>
              <p>
                <span className="text-sm text-black dark:text-white">
                  {data.mensagem}
                </span>
              </p>
            </div>
            
          </div>
        </div>
        )
      })}
      </div>
    </div>
  );
};

export default ChatCard;
