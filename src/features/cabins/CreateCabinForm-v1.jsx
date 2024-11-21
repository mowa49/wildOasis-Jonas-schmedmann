// import styled from "styled-components";

// import Input from "../../ui/Input";
// import Form from "../../ui/Form";
// import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
// import Textarea from "../../ui/Textarea";
// import { useForm } from "react-hook-form";
// import { addCabin } from "../../services/apiCabins";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import FormRow from "../../ui/FormRow";

// const FormRow2 = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

// // const Label = styled.label`
// //   font-weight: 500;
// // `;

// // const Error = styled.span`
// //   font-size: 1.4rem;
// //   color: var(--color-red-700);
// // `;

// function CreateCabinForm() {
//   const { register, handleSubmit, reset, getValues, formState } = useForm();
//   const { errors } = formState;
//   console.log(errors);
//   const queryClinet = useQueryClient();
//   const { mutate, isLoading: isCreating } = useMutation({
//     mutationFn: addCabin,
//     onSuccess: () => {
//       toast.success("new Cabin was added");
//       queryClinet.invalidateQueries({ queryKey: ["cabins"] });
//       reset();
//     },
//     onError: (error) => toast.error(error.message),
//   });

//   function onSubmit(data) {
//     mutate({ ...data, image: data.image[0] });
//     console.log(data);
//   }
//   function onError(errors) {
//     console.log(errors);
//     // errors.map((e) => console.log(e.message));
//   }
//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow label="cabin Name" error={errors?.name?.message}>
//         <Input
//           type="text"
//           id="name"
//           disabled={isCreating}
//           {...register("name", { required: "This field is requeired" })}
//         />
//       </FormRow>
//       <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
//         <Input
//           type="number"
//           id="maxCapacity"
//           disabled={isCreating}
//           {...register("maxCapacity", {
//             required: "This field is requeired",
//             min: { value: 1, message: "Capacity should be at least one" },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Price" error={errors?.regularPrice?.message}>
//         <Input
//           type="number"
//           id="regularPrice"
//           disabled={isCreating}
//           {...register("regularPrice", { required: "This field is requeired" })}
//         />
//       </FormRow>

//       <FormRow label="Discount" error={errors?.discount?.message}>
//         <Input
//           type="number"
//           id="discount"
//           defaultValue={0}
//           disabled={isCreating}
//           {...register("discount", {
//             required: "This field is requeired",
//             validate: (value) =>
//               value < getValues().regularPrice ||
//               "the discount cant be higher than regular price",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Description" error={errors?.description?.message}>
//         <Textarea
//           type="number"
//           id="description"
//           defaultValue=""
//           {...register("description")}
//           disabled={isCreating}
//         />
//       </FormRow>

//       <FormRow label="Cabin Photo" error={errors?.image?.message}>
//         <FileInput
//           id="image"
//           accept="image/*"
//           {...register("image", { required: "This field is requeired" })}
//         />
//       </FormRow>

//       <FormRow2>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isCreating}>Edit cabin</Button>
//       </FormRow2>
//     </Form>
//   );
// }

// export default CreateCabinForm;
