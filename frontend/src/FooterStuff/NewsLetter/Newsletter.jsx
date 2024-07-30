import React , {useState , useEffect} from "react";
import axios from 'axios';
import './Newsletter.css'

const Newsletter = () => {
    // logic
    const [formValues , setFormValues] = useState({
        username : '',
        email : '',
        password : '',
        reconfirm_password : '',
        gender : '',
        criminal_record : '',
        country : '',
        state : '',
        phone : '',
        
    });

    const [users , setUsers ] = useState([]);
    const [selectedFile , setSelectedFile] = useState(null);
    //const [selectedUser , setSelectedUser] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [showUsers , setShowUsers] = useState(false);
    const [showOtherStateInput, setShowOtherStateInput] = useState(false);
    const [phonePattern , setPhonePattern] = useState('');
    const [phoneExample , setPhoneExample] = useState('');

    const countries = ['USA' , 'India' , 'Canada', 'Australia', 'UnitedKingdom', 'Spain', 'Russia', 'UAE', 'Other'];

    const countryStates = {
      USA : ['California' , 'Texas ' , 'New York' , 'Alabama', 'Arizona', 'Alaska', 'Arkansas', 'Colorado', 'Conneticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming' ],
      Canada : ['Ontario' , 'Ottawa', 'Quebec' , 'Nova Scotia', 'New Brunswick', 'Manitoba', 'British Columbia', 'Prince Edward Island', 'Alberta', 'Newfoundland and Labrador'],
      India : ['Maharashtra' , 'Delhi' , 'Tamil Nadu' , 'Andra Pradesh' ,'Haryana' , 'Manipur', 'Sikkim', 'Arunachal Pradesh', 'himachal Pradesh', 'Meghalaya', 'Assam', 'Jharkhand', 'Mizoram', 'Telengana', 'Bihar', 'Karnatake', 'Nagaland', 'Tripura', 'Chattisgarh', 'Kerala', 'Odisha' , 'Goa', 'Madhya Pradesh', 'Punjab', 'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'West Bengal'],
      Australia : ['Sydney ' , 'Melbourne' , 'Auckland' , 'New South Wales' , 'Queensland' , 'Tasmania', 'Victoria'],
      UnitedKingdom : ['England', 'Scotland', 'Wales', 'Northern Ireland'],
      Spain : ['Alava', 'A Coruna', 'Albacete', 'Alicante', 'Almeria', 'Asturias', 'Avila', 'Badajoz', 'Baleric Islands' ,' Barcelona', 'Biscay', 'Burgos', 'Cacares', 'Cadiz', 'Cantabria', 'Castellon', 'Cuence', 'Guipuzco', 'Girona', 'Granada', 'Guadalajara', 'Huelva', 'Huesca', 'Jaen', 'La Rioja', 'Las Palamas', 'Leon', 'Llieda', 'Lugo', 'Madrid', 'Malaga', 'Murcia', 'Navarre', 'Ourense', 'Palencia', 'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife', 'Segovia', 'Soria ', 'Seville', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid' , 'Zamora', 'Zaragoza'],
      Russia : ['Adygea', 'Bashkortostan', 'Buryatia', 'Altai Republic', 'Dagestan', 'Ingushetia', 'Kabardino-Balkaria', 'Kalmykia', 'Karachay-Cherkessia', 'Karelia', 'Komi Republic', 'Mari El', 'Mordovia', 'Sakha (Yakutia)', 'North Ossetia–Alania', 'Tatarstan', 'Tuva', 'Udmurtia', 'Khakassia', 'Chechnya', 'Chuvashia', 'Altai Krai', 'Krasnodar Krai', 'Krasnoyarsk Krai', 'Primorsky Krai', 'Stavropol Krai', 'Khabarovsk Krai', 'Amur Oblast', 'Arkhangelsk Oblast', 'Astrakhan Oblast', 'Belgorod Oblast', 'Bryansk Oblast', 'Vladimir Oblast', 'Volgograd Oblast', 'Vologda Oblast', 'Voronezh Oblast', 'Ivanovo Oblast', 'Irkutsk Oblast', 'Kaliningrad Oblast', 'Kaluga Oblast', 'Kamchatka Krai', 'Kemerovo Oblast', 'Kirov Oblast', 'Kostroma Oblast', 'Kurgan Oblast', 'Kursk Oblast', 'Leningrad Oblast', 'Lipetsk Oblast','Magadan Oblast', 'Moscow Oblast', 'Murmansk Oblast', 'Nizhny Novgorod Oblast', 'Novgorod Oblast', 'Novosibirsk Oblast', 'Omsk Oblast', 'Orenburg Oblast', 'Oryol Oblast', 'Penza Oblast', 'Perm Krai', 'Pskov Oblast', 'Rostov Oblast', 'Ryazan Oblast', 'Samara Oblast', 'Saratov Oblast', 'Sakhalin Oblast', 'Sverdlovsk Oblast', 'Smolensk Oblast', 'Tambov Oblast', 'Tver Oblast', '	Tomsk Oblast', 'Tula Oblast', 'Tyumen Oblast', 'Ulyanovsk Oblast', 'Chelyabinsk Oblast', 'Zabaykalsky Krai', 'Yaroslavl Oblast', 'Moscow', 'Saint Petersburg', 'Jewish Autonomous Oblast', 'Nenets Autonomous Okrug', 'Khanty–Mansi Autonomous Okrug – Yugra', 'Chukotka Autonomous Okrug', 'Yamalo-Nenets Autonomous Okrug', 'Republic of Crimea', 'Sevastopol', "Donetsk People's Republic" , "Luhansk People's Republic", 'Zaporizhzhia Oblast', 'Kherson Oblast'],
      UAE : ["Abu Dhabi", 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'] 
    };

    const phonePatterns = {
      USA: '\\d{10}',
      Canada: '\\d{10}',
      India: '\\d{10}',
      Australia: '\\d{9,10}',
      UnitedKingdom: '\\d{10,11}',
      Spain: '\\d{9}',
      Russia: '\\d{10}',
      UAE: '\\d{9,10}',
      Other: '.*'
    };


    const phoneExamples = {
      USA: '(123) 456-7890',
      Canada: '(123) 456-7890',
      India: '987-654-3210',
      Australia: '0412 345 678',
      UnitedKingdom: '07123 456789',
      Spain: '612 345 678',
      Russia: '912 345-6789',
      UAE: '50 123 4567',
    };

    //display on load
    useEffect( () => {
      fetchUsers();
    }, []);

    //retrieve
    const fetchUsers = async () => {
      try{
        const response = await axios.get("http://localhost:3000/api/newsletter/users");
        //console.log(response);
        setUsers(response.data);
        setShowUsers (true);
        alert("Retreived successfully");
      }
      catch(error){
        console.error("Error in fetchUsers : " , error); 
      }
    };

    //delete
    const handleDelete = async (id) => {
      try{
        const response = await axios.delete(`http://localhost:3000/api/newsletter/users/${id}`);
        fetchUsers();
        alert("Deleted Successfully!");
      }
      catch(error){
        console.error("Error in handleDelete: ", error);
      }
    };

    //populatte form while editing
    const handleEdit = async (user) => {
      setFormValues(user);
      setSelectedUserId(user.id);
    };


    const onEdit = () => {
      console.log(formValues);
      console.log(selectedUserId);
      if(selectedUserId){
      try{
        const response = axios.put(`http://localhost:3000/api/newsletter/users/${selectedUserId}`, formValues);
        console.log(response);
        alert("User Updated Successfully");
        ClearScreen();

      }
      catch(error){
        console.error("error while updating user: " , error);
      }
    }

      else{
        alert("cant update since user doesnt exist");
      }
    }

    //change phone number as per country
    const handleChange = (e) =>{
      const {name , value } = e.target;
      setFormValues({
        ...formValues,
        [name] : value,
      });

      if(name === 'country'){
        setShowOtherStateInput(value === 'Other');
        setPhonePattern(phonePatterns[value]);
        setPhoneExample(phoneExamples[value]);
      }
    };

    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };

    //create
    const handleSubmit = async () => {
      if(formValues.password !== formValues.reconfirm_password){
        alert("Passwords do not match!");
      }
      if(!selectedFile){
        alert("No file selected!");
        return;
      }
    console.log(formValues);
    try{
        const response = await axios.post('http://localhost:3000/api/newsletter/register', formValues);
        console.log(response);
        alert("User created successfully!");
        ClearScreen();
        fetchUsers();
    }
    catch(error){
      console.error("Error in handleSubmit : ", error);
      const status = error.response.status;
      if(status == 400){
        alert("Duplicating Emails! or password not correct or passwords don't match");
      }
      else if (status == 500){
        alert("Some error occured during registration.");
      }
    }
  };

  //files
  const onUpload = async () => {
    if(selectedFile){
    let formData = new FormData();
    formData.append('file', selectedFile , selectedFile.name);
    const fileDetails = formData.get('file');
    console.log("The file details are :  ", fileDetails);


    try{
      const response = await axios.post('http://localhost:3000/api/newsletter/upload', formData);
    }
    catch(error){
      console.error("Error while Uploading File : " + error);
    }
    }
  }

  const ClearScreen = () => {
    setFormValues({
      username: '',
        email: '',
        password: '',
        reconfirm_password: '',
        gender: '',
        criminal_record: '',
        country: '',
        state: '',
        phone: '',
    });
    setSelectedFile (null);
  }

  const sortAsc = () => {
    const sortedUsers = [...users].sort((a, b) => a.username.localeCompare(b.username));
    setUsers(sortedUsers);
};

  const sortDesc = () => {
    const sortedUsersDesc = [...users].sort((a,b) => b.username.localeCompare(a.username));
    setUsers(sortedUsersDesc);
  }

  const sortById = () => {
    const sortedUsersId = [...users].sort((a,b) => a.id - b.id);
    setUsers(sortedUsersId);
   }


  return (
    <div>
      <form id="whole_form">
        <input type="text" name="username" placeholder="Username" value={formValues.username} onChange={handleChange} required  className="input_box_newsletter"/>
        <input type="email" name="email" placeholder="Email" value={formValues.email} onChange={handleChange} required className="input_box_newsletter"/>
        <input type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange} required  className="input_box_newsletter"/>
        <input type="password" name="reconfirm_password" placeholder="Confirm Password" value={formValues.reconfirm_password} onChange={handleChange} required className="input_box_newsletter"/>
        <select name="gender" value={formValues.gender} onChange={handleChange} required>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select name="criminal_record" value={formValues.criminal_record} onChange={handleChange} required>
          <option value="">Criminal Record</option>
          <option value="Y">Yes</option>
          <option value="N">No</option>
        </select>
        <select name="country" value={formValues.country} onChange={handleChange} required>
          <option value="">Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        {formValues.country && !showOtherStateInput && (
          <select name="state" value={formValues.state} onChange={handleChange} required>
            <option value="">State</option>
            {countryStates[formValues.country].map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        )}
        {showOtherStateInput && (
          <input type="text" name="state" placeholder="State" value={formValues.state} onChange={handleChange} required />
        )}
        <input  id  ="tel_newsletter"  type="tel" name="phone" placeholder={`Phone (${phoneExample})`} pattern={phonePattern} value={formValues.phone} onChange={handleChange} required />
        <input type="file" onChange={handleFileChange} required id="input_file_newsletter"/> 

        div <div className="button_container_newsletter">
        <button  onClick={event => {
          onUpload();
          handleSubmit();
        }} className="newsletter_button" >Register</button>
        <button onClick={fetchUsers} className="newsletter_button">Show Users</button>
        <button className="newsletter_button" onClick={onEdit}>Update</button>
        <button className="newsletter_button" onClick={ClearScreen}>Clear</button>
        <button className="newsletter_button" onClick={sortAsc}>Sort Asc</button>
        <button className="newsletter_button" onClick={sortDesc}>Sort Desc</button>
        <button className="newsletter_button" onClick={sortById}>Sort By Id</button>
        </div>
      </form>

      {showUsers && (
        <table id="newsletter_table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Country</th>
              <th>State</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.country}</td>
                <td>{user.state}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => handleEdit(user)} className="newsletter_button">Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="newsletter_button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


export default Newsletter
