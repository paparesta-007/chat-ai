import supabase from "../../library/supabaseclient.js"

const insertSingleProvider = async (providerName, apiKey, user_id) => {
    const { data, error } = await supabase
        .from("api_providers")
        .insert([
            { providerName, apiKey, user_id }
        ]);
    if (error) {
        console.error("Error inserting API Key Provider:", error);
        return null;
    }
    return data;
}
export default insertSingleProvider;
