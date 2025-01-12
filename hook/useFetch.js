import axios from "axios";
import { useState, useEffect } from "react";


const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);


    const axios = require('axios');

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: { ...query
        },
        headers: {
            'x-rapidapi-key': '537115d70bmsh8249bde6b180ee8p1a93e2jsn93f75776f0d5',
            'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);

            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert('There is an error');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return {
        data, isLoading, error, refetch
    };
}

export default useFetch;
