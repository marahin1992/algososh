import { useState, useCallback, ChangeEvent } from "react";

type FormValuesType = {
  [key: string] : string | number | null,
}

export const useForm = <T extends FormValuesType>(initialValues: T): [T, (e: ChangeEvent<HTMLInputElement>) => void, (resetValues: T) => void, boolean] =>  {
  const [values, setValues] = useState({isEdit: false, form: initialValues});

  const formValues = values.form;
  const isEdit = values.isEdit

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({...values, form:{...values.form, [e.target.name]: e.target.value}, isEdit: true });
  };

  const handleReset = (resetValues: T) => {
    setValues({...values, form: resetValues, isEdit: false})
  }


  return [formValues,
    handleChange,
    handleReset,
    isEdit]
};