import React, { useState } from 'react';

const finnhubURL = 'https:/finnhub.io/api/v1/'
const myKey = 'c6ehmh2ad3ie37m1955g'
let symbol = ''

function Form (props){

    const initialState = ({form: symbol})
    const [formState, setFormState] = useState([])
    const [formPrice, setFormPrice] = useState({})
    const [formLoading, setFormLoading] = useState(false)
    const [formError, setFormError] = useState(false)

    const handleChange = ev => setFormState({...formState, [ev.target.id]: ev.target.value})

    const handleSubmit = ev => {
        ev.preventDefault()
        setFormLoading(true)
        setFormPrice({})
        setFormError(false)
        

        if (formState.form.length < 1) {return}
        
        const tickerURL = `${finnhubURL}quote?symbol=${formState.form.toUpperCase()}&token=${myKey}`
        //FOR NAME LOOK UP
        const nameURL = `${finnhubURL}search?q=${formState.form}&token=${myKey}`
            
            fetch(tickerURL)
                .then(res => res.json())
                .then(res => {
                    let price = res.c
                    if (price === 0) {
                        setFormLoading(false)
                        setFormError(true)
                        return
                    }
                    setFormPrice({price, symbol: formState.form})
                    setFormLoading(false)
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
                <input className='input' type='text' onChange={handleChange} value={formState.form} id='form'></input>
                <button className='button'>Search</button>
            </form>
            {Object.keys(formPrice).length ? <div className='price-info'><span className='ticker'>{`${formPrice.symbol.toUpperCase()} `}</span>{`is currently trading at `}<span className='price'>{`$${formPrice.price}`}</span>
            </div> : null}
            {formLoading ? <div className='loading'>Loading...</div> : null}
            {formError ? <div className='error'>Sorry! No such ticker found.</div> : null}
            {!Object.keys(formPrice).length && !formLoading && !formError ? <div className='intro'>
                Check your stock prices!
            </div> : null}
        </div>
    );
}

export default Form;