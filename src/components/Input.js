import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input as TextInput,
  Select as InputSelect,
  Textarea,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import { useField } from "formik";

const Input = ({ label, isRequired, children, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl
      mb={3}
      isRequired={isRequired}
      isInvalid={meta.touched && meta.error}
    >
      {label && (
        <FormLabel
          mb={2}
          htmlFor={props.id || props.name}
          fontWeight="700"
        >
          {label}
        </FormLabel>
      )}
      
      <InputGroup mb={2}>
        <InputLeftElement
          pointerEvents="none"
          children={children}
        />
        <TextInput {...field} {...props} focusBorderColor="blue.400"/>
      </InputGroup>
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default Input;

export const Select = ({ label,isRequired, children, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl mb={3} isRequired={isRequired}>
      <FormLabel mb={2} htmlFor={props.id || props.name} fontWeight="700">
        {label}
      </FormLabel>
      <InputSelect
        focusBorderColor="blue.400"
        isInvalid={meta.touched && meta.error ? true : false}
        mb={2}
        {...field}
        {...props}
      >
        {children}
      </InputSelect>
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export const TextArea = ({ label, isRequired, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl
      mb={3}
      isRequired={isRequired}
      isInvalid={meta.touched && meta.error}
    >
      {label && (
        <FormLabel
          mb={2}
          htmlFor={props.id || props.name}
          fontWeight="700"
        >
          {label}
        </FormLabel>
      )}
      
        <Textarea 
          resize="none" 
          {...field} 
          {...props}
          isInvalid={meta.touched && meta.error ? true : false}
          mb={2}  
          focusBorderColor="blue.400"
        />

      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};





