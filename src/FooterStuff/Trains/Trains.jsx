import { React, useState } from 'react'
import axios from 'axios'
import TrainCard from './TrainCard';

const Trains = () => {


    /*const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const [formData, setFormData] = useState({
      from: '',
      to: '',
      date: '',
      adults: '',
      type: '',
    });*/

    const [results, setResults] = useState([]);

    /*const handleSubmit = async (e) => {
        e.preventDefault();*/

        const options = {
            method: 'GET',
            url: 'https://irctc1.p.rapidapi.com/api/v1/checkSeatAvailability',
            params: {
                classType: '2A',
                fromStationCode: 'ST',
                quota: 'GN',
                toStationCode: 'BVI',
                trainNo: '19038',
                date: '2024-03-20'
            },
            headers: {
                'X-RapidAPI-Key': '47b6ef6d4dmsh52365304ae1b633p171b3cjsn13e9575cd280',
                'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
            }
        };

        try {
            const response = axios.request(options);
            console.log(response.data);
            console.log("chalra hu mai")
        } catch (error) {
            console.error(error);
        }
    

    return (
        <>

    </>
   
  )
}
export default Trains