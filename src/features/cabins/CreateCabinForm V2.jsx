import { useForm } from "react-hook-form";
import { addEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

// const Label = styled.label`
//   font-weight: 500;
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;
/* eslint-disable react/prop-types */
function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  console.log(errors);
  const queryClinet = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: addEditCabin,
    onSuccess: () => {
      toast.success("new Cabin was added");
      queryClinet.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => addEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("the Cabin has been edited");
      queryClinet.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin({ newCabinData: { ...data, image: image }, id: editId });
    console.log(data);
    if (!isEditSession) createCabin({ ...data, image: data.image[0] });
    // console.log(data);
  }
  function onError(errors) {
    console.log(errors);
    // errors.map((e) => console.log(e.message));
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is requeired" })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is requeired",
            min: { value: 1, message: "Capacity should be at least one" },
          })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", { required: "This field is requeired" })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is requeired",
            validate: (value) =>
              value < getValues().regularPrice ||
              "the discount cant be higher than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is requeired",
          })}
        />
      </FormRow>

      <FormRow2 disabled={isWorking}>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          variations="secondary"
          size="medium"
        >
          Cancel
        </Button>
        <Button disabled={isWorking} variations="primary" size="medium">
          {isEditSession ? "Edit cabin" : "Create new Cabin"}
        </Button>
      </FormRow2>
    </Form>
  );
}

export default CreateCabinForm;
