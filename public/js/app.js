console.log('Client side js loading...');
const fetchWeather = location => {
    return fetch(`/weather?address=${location}`);
};

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const { value: query } = search;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';


    //    const  = 
    fetchWeather(query)
        .then(response => response.json())
        .then(({ error, location, summary, temperature, precipitation }) => {
            if (error) {
                messageOne.textContent = error;
                return console.log(error);
            }
            messageOne.innerHTML = location;
            messageTwo.innerHTML = `${summary}. It is currently ${temperature} degrees. <br/> There is a ${precipitation} chance of rain.`;

            console.log(error);
            console.log(`${summary}. It is currently ${temperature} degrees. There is a ${precipitation} chance of rain.`);

        });
});