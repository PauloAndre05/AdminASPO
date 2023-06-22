import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { api } from '../services';
import { mutate } from 'swr';
import React from 'react';

type formProps = {
  onclose: () => void;
};

export const FormOfficial: React.FC<formProps> = () => {

  const urlPosto = "http://localhost:5555/posto"

  const formik = useFormik({
    initialValues: {
      nome: '',
      local: '',
      cordenadas: '',
      limiteDiario: ''
    },
    validationSchema: yup.object({
      nome: yup.string().required('Este campo é obrigatório'),
      local: yup.string().required('Este campo é obrigatório'),
      cordenadas: yup.string().required('Este campo é obrigatório'),
      limiteDiario: yup.number().required('Especifique o limite de atendimento diário')
    }),
    onSubmit: async (data) => {

      console.log(data);
      
      try {
        const response = await fetch(urlPosto, {
          method: "POST",
          headers:{
            "Content-type": "application/json"
          }, 
          body: JSON.stringify(data)
        });

        if (response.ok) {
          mutate('/funcionarios');
          formik.resetForm();
          toast.success('Posto cadastrado com sucesso');
        }

        else{
          toast.error('Impossível cadastrar, por favor, verifique os dados')
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
                    Nome do Posto de Atendimento <span className="text-meta-1">*</span>
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
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Localização do Posto <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Insira a localização do posto"
                  id="local"
                  name="local"
                  value={formik.values.local}
                  onChange={formik.handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Coordenadas geográfica do Posto <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  id="cordenadas"
                  name="cordenadas"
                  value={formik.values.cordenadas}
                  onChange={formik.handleChange}
                  placeholder="https://googleMaps/admin/..."
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Limite de atendimento diário <span className="text-meta-1">*</span>
                </label>
                <input
                  type="number"
                  id="limiteDiario"
                  name="limiteDiario"
                  value={formik.values.limiteDiario}
                  onChange={formik.handleChange}
                  placeholder="max 3 (000)"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

             

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
