import supabase from "../../library/supabaseclient.js";

const updateUserData = async (uuid, fullName="", imgUrl="") => {
    const { data, error } = await supabase
        .from("profiles")
        .update({
            full_name: fullName,
            avatar_url: imgUrl,
        })
        .select()
        .eq("user_id", uuid);

    if (error) {
        console.error("Error fetching conversations:", error);
        return [];
    }
    return data[0];
};

export default updateUserData;

