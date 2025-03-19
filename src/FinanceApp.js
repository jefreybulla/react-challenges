/* # Build a Real-Time BTC Exchange Dashboard

You need to build a React component that:

-Fetches live exchange rates for BTC.
-Allows the user to enter an amount in USD and see the equivalent values BTC.
- Updates exchange rates every 10 seconds.
- Shows a "Refresh" button that lets the user manually fetch updated rates.
- Handles API errors gracefully.


// Follow up: render the ETH conversion as well
*/

import { useState, useEffect} from "react"

export default function FinanceApp(){
    const [showError, setShowError] = useState(false)
    const [btcAmount, setBtcAmount] = useState(0)
    const [usdAmount, setUsdAmount] = useState(0)

    // Poll exchange rates every 10 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            refreshPrices();
        }, 10000);

        return () => clearInterval(intervalId); // Cleanup interval when usdAmount changes
    }, [usdAmount])

    const refreshPrices = async() => {
        if(usdAmount > 0){
            convert(usdAmount)
        }
    }
    
    const callAPI = async(coin) => {
        const url = `${process.env.REACT_APP_EXCHANGE_RATE_BASE_URL}/exchanges/binance/${coin}?base=USDT`
        console.log('checking exchange rates...')
        try {
            const response = await fetch(url, {
                headers: {
                    [process.env.REACT_APP_HEADER1_NAME]: process.env.REACT_APP_HEADER1_VALUE,
                    [process.env.REACT_APP_HEADER2_NAME]: process.env.REACT_APP_HEADER2_VALUE, 
                }
            })
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`)
            }
            const json = await response.json()
            console.log('API response -->')
            console.log(json)
            return Number(json.data.price)
        }
        catch (error) {
            console.error(error.message)
        }
    }

    const convert = async(num) => {
        console.log('calling API...')
        //const exchangeRate = await callAPI('BTC')
        //const exchangeRate = await callAPI('ETH')
        // use next line for testing without the API call
        const exchangeRate = 80000 

        const btcEquivalent = num/exchangeRate
        setBtcAmount(btcEquivalent)
    }

    const validateInput = (userInput) => {
        if (typeof userInput != "string") return false // we only process strings!  
        return !isNaN(userInput) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(userInput)) // ...and ensure strings of whitespace fail
        
    }

    const handleChange = (event) => {
        const userInput = event.target.value
        if(!validateInput(userInput)){
            setShowError(true)
            return
        }
        setShowError(false)
        const inputAsNumber = Number(userInput)
        convert(inputAsNumber)
        setUsdAmount(inputAsNumber)
        refreshPrices()
    }

    return(
        <>
        <p>BTC Exchange rate. Rate updates automatically every 10 seconds</p>
        <div>
        <label htmlFor="usd-amount">USD </label>
        <input type='number' id='usd-amount' placeholder="Enter USD amount" onChange={(event)=> handleChange(event)}></input>
        <button onClick={refreshPrices}>Refresh</button>
        { showError && <span style={{ color: 'red', paddingLeft: '5px'}}>Must enter a number!</span> }
        </div>
        <div style={{paddingTop: '10px'}}>
            <span>BTC</span>
            <span style={{ paddingLeft: '15px'}}>{ btcAmount }</span>
        </div>
        </>
    )
}