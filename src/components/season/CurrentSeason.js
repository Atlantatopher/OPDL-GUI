import React, { useState, useEffect } from 'react';

function CurrentSeason (props) {
const [season, setSeason] = useState({id:props.seasonId});
useEffect(() => {
      fetch('http://localhost:8080/api/v1/seasons/' + season.id, {
         method: 'GET',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
       })
         .then((response) => {
            if(!response.ok) throw new Error(response.status);
             else return response.json()
         })
         .then((data) => {
             setSeason(data);
         })
         .catch((error) => {
             console.log('error: ' + error);
           });
   }, []);
   return(
    <>
        For the {season.description} season
    </>
   )
}

export default CurrentSeason;