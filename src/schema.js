import * as yup from 'yup';

const schema = yup.object().shape({
    nameInput: yup
        .string()
        .trim()
        .required("Name is required")
        .min(2, "name must be at least 2 characters"),
    sizeInput: yup
        .string()
        .required(),
    pepperoni: yup.boolean(),
    onions: yup.boolean(),
    blackOlives: yup.boolean(),
    pineapple: yup.boolean(),
    'special-text': yup
        .string()
})

export default schema;