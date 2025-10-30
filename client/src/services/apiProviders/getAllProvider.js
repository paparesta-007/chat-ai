import supabase from "../../library/supabaseclient.js"

const getAllProviders = async ( user_id) => {
    const { data, error, status } = await supabase
        .from('api_providers')
        .select('providerName, updated_at, apiKey, user_id') 
        .eq('user_id', user_id)
         

    if (error) {
        console.error('Error fetching provider', { status, error });
        return null;
    }
        return data; 
    }
export default getAllProviders;