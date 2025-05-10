// Created by Judith Kurian (B00940475)

export const postCall = async (url, body) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        };
        const response = await fetch(url, options);
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}

export const getCall = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET'
      });
      if (response.ok) {
        const responseData = response;
        return responseData;
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error in API Call:', error);
    }
}