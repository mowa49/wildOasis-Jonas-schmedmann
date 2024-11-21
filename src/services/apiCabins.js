import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("cabins could not be laoded");
  }

  return cabins;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("cabins could not be deleted");
  }
}

export async function addEditCabin(newCabin, id) {
  console.log(id);
  // const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const hasImagePath = newCabin.image?.includes?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // https://snsjbbvjprjidacmzwpw.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  ///// 1.create cabin
  let query = supabase.from("cabins");
  //////Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  ///// edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (hasImagePath) return data;
  if (error) {
    console.log(error);
    throw new Error("cabins could not be added");
  }
  ///// 2.upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  /////// 3. delete the cabin if there was an error for uploading image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("cabins could not be added");
  }
  return data;
}
