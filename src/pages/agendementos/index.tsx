import Breadcrumb from '../../components/Breadcrumb';
import TableThree from '../../components/TableThree';
import useFetch from '../../hooks/usefetch';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState } from 'react';
import Modal from '../../components/Modal';
import { api } from '../../services';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { FormCategory } from '../../components/FormCategory';
import TableThreeCategory from '../../components/TableThreeCategory';
import TableThreePedidos from '../../components/TableThreePedidos';

type officilProps = {
  id: string;
  nome: string
  comprovativo: string
  dataAgenda: string
};

export const Pedidos = () => {
  const { data: agendamento } = useFetch('/agendamento');

  console.log(agendamento);

  const [cancelado, setCancelado] = useState([])

  const [item, setItem] = useState<officilProps>({
    id: '',
    nome: '',
    comprovativo: '',
    dataAgenda: ''
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModalEdit = (item: officilProps) => {
    setItem(item);
    setIsOpenEdit(true);
  };

  const closeModalEdit = () => {
    setIsOpenEdit(false);
  };   
    

  const confirmar = async (item: officilProps) => {
    
    const dataActual = new Date()
    const dia = String(dataActual.getDate()).padStart(2, '0')
    const mes = String(dataActual.getMonth() + 1).padStart(2, '0')
    const ano = dataActual.getFullYear()
    const dataFormatada = (`${ano}-${mes}-${dia}`)

    if(!(dataFormatada === item.dataAgenda)){
      console.log("diferentes");
      toast.error("Agendamento em espera, inpossível confirmar")
      setIsOpenEdit(false)
      return
    }
    
    try{
      const response = await fetch(`http://localhost:5555/agendamento/eliminar/${item.id}`, {
        method: "DELETE"
      })
      
      if (response.ok) {
        setIsOpenEdit(false)
        mutate("/agendamento")
        toast.success("Agendamento confirmado com sucesso")
        const responseData = await response.json()
        console.log("============================================");
        console.log(responseData);
        
        console.log("============================================");

        try{
          const responseConfirmado = await fetch("http://localhost:5555/confirmado", {
            method: "POST", 
            headers:{
              "Content-type": "application/json"
            },
            body: JSON.stringify(responseData)
          })
        }
        catch{
          toast.error("Erro de servidor")
        }

      }
    }
    catch {
      toast.error("Erro de servido")  
    }
    
  }

  async function onRemove(item: officilProps) {
    const resp = confirm(
      `Tens certeza que quer eliminar o agendamento ${item?.comprovativo} `
    );
    if (resp) {
      try {
        const response = await api.delete(`/agendamento/eliminar/${item?.id}`);
        if (response) {
          mutate('/agendamento');
          toast.success('Agendamento deletado com sucesso');
          const responseData = await response.data
          console.log(responseData);
        }
      } catch (err: any) {
        toast.error(err?.error?.message);
      }
    }
  }

  console.log(cancelado.length);

  return (
    <DefaultLayout>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="mb-4 text-xl font-bold">Listar agendamento</h2>
        <FormCategory onclose={closeModal} />
      </Modal>

      <Modal isOpen={isOpenEdit} onClose={closeModalEdit}>
        <h2 className="mb-4 text-xl font-bold text-center text-white dark:text-black">Confirmar Agendamento</h2>
        <div className='flex justify-around mt-5 mb-5 p-10'>
          <button  onClick={closeModalEdit} className='bg-meta-1 px-10 py-3 text-white rounded hover:opacity-[.8]'>Rejeitar</button>
          <button onClick={() => confirmar(item)} className=' bg-primary  px-10 py-3 text-white rounded hover:opacity-[.8]'>Confirmar</button>
        </div>
      </Modal>

      <Breadcrumb pageName="Agendamentos" /> 

      {/* <!-- ====== Calendar Section Start ====== --> */}
      {/* <div className="flex flex-1 justify-end py-2">
        <button
          onClick={openModal}
          className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Adicionar
        </button>
      </div> */}
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
        <TableThreePedidos
          heads={['Nome', 'Documento', 'Data agendada', 'Posto', 'Acção']}
          data={agendamento}
          onRemove={onRemove}
          openModalEdit={openModalEdit} 
        />
      </div>
      {/* <!-- ====== Calendar Section End ====== --> */}
    </DefaultLayout>
  );
};
