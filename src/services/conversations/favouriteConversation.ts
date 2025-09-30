import supabase from "../../library/supabaseclient.js"

const favouriteConversation = async (status: boolean=false, uuid: string) => {
    const { data, error } = await supabase
        .from("conversations")
        .update({ favourite: status })
        .eq("id", uuid)
        .select();

    if (error) {
        console.error("Error creating conversation:", error);
        return [];
    }
    return data; // data sarà un array [{ id: ..., title: ... }]
}

export default favouriteConversation;
