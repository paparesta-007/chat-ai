import supabase from "../../library/supabaseclient.js";

const selectUserData = async (uuid) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", uuid);

    if (error) {
        console.error("Error fetching conversations:", error);
        return [];
    }
    return data[0];
};

export default selectUserData;

