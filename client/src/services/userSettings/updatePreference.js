import supabase from "../../library/supabaseclient.js";

const updatePreference = async (uuid, json) => {
    const { data, error } = await supabase
        .from("profiles")
        .update({ preferences: json })


        .eq("user_id", uuid)
        .select();

    if (error) {
        console.error("Error fetching conversations:", error);
        return [];
    }
    return data;
};

export default updatePreference;

