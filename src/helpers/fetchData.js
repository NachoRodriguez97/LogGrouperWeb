export const fetchData = async ({ url, dataBody }) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
            },
            body: JSON.stringify(dataBody),
            timeout: 60000,
            cache: 'no-cache'
        })

        const data = await response.json()
        return {
            data,
            isLoading: false
        }
        
    } catch (error) {
        console.log(error)
        throw error;
    }

}
