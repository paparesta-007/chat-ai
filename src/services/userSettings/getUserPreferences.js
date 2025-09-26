import supabase from "../../library/supabaseclient.js";

const getUserPreferences = async (uuid) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("preferences")

        .eq("user_id", uuid);

    if (error) {
        console.error("Error fetching conversations:", error);
        return [];
    }
    return data[0];
};

export default getUserPreferences;

