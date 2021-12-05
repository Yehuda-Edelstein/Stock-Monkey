import React from 'react';

function Nav(props) {
    return (
        <div>
            <ul className='nav'>
                <li><a href='https://finance.yahoo.com/' className='quotes' target='_blank' rel='noreferrer noopener'>Quotes</a></li>
                <li><a href='https://www.investopedia.com/' className='learn' target='_blank' rel='noreferrer noopener'>Learn</a></li>
                <li><a href='https://www.tdameritrade.com/' className='trade' target='_blank' rel='noreferrer noopener'>Trade</a></li>
                <li><a href='https://www.coinbase.com/price' className='crypto' target='_blank' rel='noreferrer noopener'>Crypto</a></li>
            </ul>
        </div>
    );
}

export default Nav;