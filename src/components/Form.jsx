import React, { useState } from 'react';

const finnhubURL = 'https:/finnhub.io/api/v1/'
const myKey = 'c6ehmh2ad3ie37m1955g'
let symbol = ''

function Form (props){

    const initialState = ({form: symbol})
    const [formState, setFormState] = useState([])

    const handleChange = ev => setFormState({...formState, [ev.target.id]: ev.target.value})

    const handleSubmit = ev => {
        ev.preventDefault()
        if (formState.form.length < 1) {return}
        
        const tickerURL = `${finnhubURL}quote?symbol=${formState.form}&token=${myKey}`
        const nameURL = `${finnhubURL}search?q=${formState.form}&token=${myKey}`
            
            fetch(tickerURL)
                .then(res => res.json())
                .then(res => {
                    let price = res.c
                    if (price === 0) {
                        console.log("No Ticker")
                        return
                    }
                    console.log(price)
                })
                .catch(err => {
                    console.log(err)
                })
                
          
            // HOW TO GET STOCK PRICE FROM NAME THROUGH A DIFFERENT API CALL    
            // fetch(nameURL)
            //     .then(res => res.json())
            //     .then(res => {
            //         let ticker = res.symbol
            //         console.log(ticker)
            //     })
        setFormState(initialState)
    }

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <input type='text' onChange={handleChange} value={formState.form} id='form'></input>
                <button className='button'>Search</button>
            </form>
            <div className='price'>
            </div>
        </div>
    );
}

export default Form;