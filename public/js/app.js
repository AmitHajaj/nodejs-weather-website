console.log('Client side loaded')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    e.preventDefault()
    const location = searchElement.value

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msg1.textContent = data.error
                msg2.textContent = ''
                console.log(data.error)
            }   
            else{
                msg1.textContent = data.location
                msg2.textContent = data.forecast.msg
            }
        })
    })
})
