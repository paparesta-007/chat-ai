import supabase from "../../library/supabaseclient.js"
const deleteSingleProvider = async (providerName, user_id) => {
    const now = new Date();
    const DataAdesso = now.toISOString();
    const { data: updatedData, error: updateError } = await supabase
        .from('api_providers')
        .delete()
        .eq('user_id', user_id)
        .eq('providerName', providerName)
        .select()
        .maybeSingle();

    if (updateError) {
        console.error('Error deleting provider', { status: updateError.status, error: updateError });
        return null;
    }

    return updatedData;
}
export default deleteSingleProvider;