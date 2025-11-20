import supabase from "../../library/supabaseclient";

const getAllModels = async () => {
    const { data, error } = await supabase.from("models").select("*");
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export default getAllModels;