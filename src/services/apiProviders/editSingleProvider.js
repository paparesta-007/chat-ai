import supabase from "../../library/supabaseclient.js"
const editSingleProvider = async (providerName,  newApiKey, user_id) => {

    const { data: updatedData, error: updateError } = await supabase
        .from('api_providers')
        .update({ apiKey: newApiKey})
        .eq('user_id', user_id)
        .eq('providerName', providerName)
        .select()
        .single();

    if (updateError) {
        console.error('Error updating provider', { status: updateError.status, error: updateError });
        return null;
    }

    return updatedData;
}
export default editSingleProvider;