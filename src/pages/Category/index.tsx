import Breadcrumb from '../../components/Breadcrumb';
import TableThree from '../../components/TableThree';
import useFetch from '../../hooks/usefetch';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState } from 'react';
import Modal from '../../components/Modal';
import { api } from '../../services';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { FormOfficialEdit } from '../official/EditOficial';
import { FormCategory } from '../../components/FormCategory';
import TableThreeCategory from '../../components/TableThreeCategory';
import { FormCategoryEdit } from './EditCategory';

type officilProps = {
  id: string;
  attributes: {
    nome: string;
    email: string;
    telefone: string;
  };
};

export const Category = () => {
  const { data: Categorias } = useFetch('/categorias');
  const [item, setItem] = useState<officilProps>({
    attributes: {
      email: '',
      nome: '',
      telefone: '',
    },
    id: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  console.log(Categorias);

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

  async function onRemove(item: { id: string; attributes: { nome: string } }) {
    const resp = confirm(
      `Tens certeza que queres eliminar o(a) ${item?.attributes?.nome} `
    );
    if (resp) {
      try {
        const response = await api.delete(`/categorias/${item?.id}`);
        if (response) {
          mutate('/categorias');
          toast.success('Categoria deletada com sucesso');
        }
      } catch (err: any) {
        toast.error(err?.error?.message);
      }
    }
  }

  return (
    <DefaultLayout>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="mb-4 text-xl font-bold">Adicionar Categoria</h2>
        <FormCategory onclose={closeModal} />
      </Modal>

      <Modal isOpen={isOpenEdit} onClose={closeModalEdit}>
        <h2 className="mb-4 text-xl font-bold">Actulizar Categoria</h2>
        <FormCategoryEdit onclose={closeModalEdit} item={item} />
      </Modal>

      <Breadcrumb pageName="Categoria" />

      {/* <!-- ====== Calendar Section Start ====== --> */}
      <div className="flex flex-1 justify-end py-2">
        <button
          onClick={openModal}
          className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Adicionar
        </button>
      </div>
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <TableThreeCategory
          heads={['Nome', 'Acção']}
          data={Categorias?.data}
          onRemove={onRemove}
          openModalEdit={openModalEdit}
        />
      </div>
      {/* <!-- ====== Calendar Section End ====== --> */}
    </DefaultLayout>
  );
};
