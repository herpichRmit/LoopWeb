import { useState, useEffect } from "react";

const useForm = (callback, validate) => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        console.log(Object.keys(errors).length + " " + isSubmitting + " " + 'Errors:', JSON.stringify(errors));
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }

    }, [errors]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));

    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    }
}

export default useForm;