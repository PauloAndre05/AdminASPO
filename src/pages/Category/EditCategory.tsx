import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { api } from '../../services';
import { mutate } from 'swr';
import React from 'react';

type officilProps = {
  id: string;
  attributes: {
    nome: string;
    email: string;
    telefone: string;
  };
};
type formProps = {
  onclose: () => void;
  item: officilProps;
};

export const FormCategoryEdit: React.FC<formProps> = ({ item }) => {
  const formik = useFormik({
    initialValues: {
      id: item?.id,
      nome: item?.attributes?.nome,
    },
    validationSchema: yup.object({
      nome: yup.string().required('Este campo é obrigatório'),
      id: yup.string().required(),
    }),
    onSubmit: async (fields) => {
      try {
        const newData = { data: { ...fields } };
        const response = await api.put(`/categorias/${fields?.id}`, newData);
        if (response?.status === 200) {
          mutate('/categorias');
          toast.success('categoria actualizada com sucesso');
        }
      } catch (err: any) {
        toast.error(err?.error?.message);
      }
    },
  });

  return (
    <>
      <div className="flex  w-full flex-col overflow-scroll">
        <div className="rounded-sm bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Contact Form
            </h3>
          </div> */}
          <form onSubmit={formik.handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full ">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nome
                  </label>
                  <input
                    type="text"
                    placeholder="Insira um nome"
                    id="nome"
                    name="nome"
                    value={formik.values.nome}
                    onChange={formik.handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                {/* <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div> */}
              </div>

              {/* <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email <span className="text-meta-1">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Insira um email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div> */}

              {/* <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Telefone
                </label>
                <input
                  type="number"
                  id="telefone"
                  name="telefone"
                  value={formik.values.telefone}
                  onChange={formik.handleChange}
                  placeholder="Insira um numero de telefone"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div> */}

              {/* <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Subject
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <option value="">Type your subject</option>
                    <option value="">USA</option>
                    <option value="">UK</option>
                    <option value="">Canada</option>
                  </select>
                  <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div> */}
              {/* 
              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Message
                </label>
                <textarea
                  rows={6}
                  placeholder="Type your message"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div> */}

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
