import React, { useState } from 'react';

const finnhubURL = 'https:/finnhub.io/api/v1/'
const myKey = process.env.REACT_APP_API_KEY
let symbol = ''

function Form (props){
    const initialState = ({form: symbol})

    const [formState, setFormState] = useState([])
    const [formPrice, setFormPrice] = useState({})
    const [formLoading, setFormLoading] = useState(false)
    const [formError, setFormError] = useState(false)

    const handleChange = ev => {
        ev.preventDefault()
        setFormState({...formState, [ev.target.id]: ev.target.value})
        // HOW TO HAVE FORM WORK FOR FOR NAME LOOK UP TOO?
        // const nameURL = `${finnhubURL}search?q=${formState.form}&token=${myKey}`
        // fetch(nameURL)
        //     .then(res => res.json())
        //     .then(console.log)
    }

    const handleSubmit = ev => {
        ev.preventDefault()
        if (Object.keys(formState).length === 0) {return}

        setFormLoading(true)
        setFormPrice({})
        setFormError(false)
        
        

            const tickerURL = `${finnhubURL}quote?symbol=${formState.form.toUpperCase()}&token=${myKey}`
            fetch(tickerURL)
                .then(res => res.json())
                .then(res => {
                    let price = res.c
                    if (price === 0) {
                        setFormLoading(false)
                        setFormError(true)
                    } else {
                    setFormPrice({price, symbol: formState.form})
                    setFormLoading(false)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        setFormState(initialState)
    }

    return (
        <div>
       
        <div className='main'>
            
            <form className='form' onSubmit={handleSubmit}>
            <div className='button-div'><button className='button'>🔍</button></div>
                <input className='input' type='text' placeholder=' Search...' onChange={handleChange} value={formState.form} id='form'>    
                </input>
            </form>
            </div>

        <div className='stock-info'>
            {Object.keys(formPrice).length ? <div className='price-info'><span className='ticker'>{`${formPrice.symbol.toUpperCase()} `}</span>{`is currently trading at `}<span className='price'>{`$${formPrice.price.toFixed(2)}`}</span>
                <div className='link'>
                <a className='real-link' href={`https://finance.yahoo.com/quote/${formPrice.symbol}?p=AAPL&.tsrc=fin-srch`} target='_blank' rel='noreferrer noopener'>Click here for a live feed</a>
                </div>
                </div> : null}
            </div>

            {formLoading ? <div className='loading'>🐵</div> : null}

            {formError ? <div className='error'>Sorry! No such ticker found.</div> : null}

            {!Object.keys(formPrice).length && !formLoading && !formError ? <div className='intro'>
                Check your stock prices!
            </div> : null}
        
        </div>
    );
}

export default Form;