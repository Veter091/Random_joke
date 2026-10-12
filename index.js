document.addEventListener('DOMContentLoaded', function() {

    // Нахождение элементов на странице 
    const jokeContainer = document.querySelector('.joke-container')
    const jokeText = document.querySelector('.joke-text')
    const jokeAnswer = document.querySelector('.joke-answer')
    const jokeIndicator = document.querySelector('.joke-indicator')


    // Массив для хранения всех шуток
    const arrJoke = []

    
    // Счетчик количества текущих шуток
    let counterCurrent = 0



    // Функция запроса шутки 
    function fetchJoke() {

        return fetch('https://official-joke-api.appspot.com/jokes/random')
            .then(responce => responce.json())
            .then(json => {
                arrJoke.push(json)

                console.log(json.setup)
                console.log(arrJoke)

                return json
            })

    }
    fetchJoke()
        .then(() => {
            showJoke(counterCurrent)
            updateIndicatorJoke()
        })
        .catch(error => {
            console.error('Ошибка', error)
        })


    // Функция для показа шутки 
    function showJoke(index) {
        let currentJoke = arrJoke[index].setup
        let currentAnswer = arrJoke[index].punchline

        jokeText.textContent = currentJoke
        jokeAnswer.textContent = currentAnswer
    }



    // Делегирование на container: действия с кнопками
    jokeContainer.addEventListener('click', function(e) {
        const jokeButton = e.target.closest('.joke-button')

        if (!jokeButton) return 

        if (e.target.closest('.back')) {

            if (counterCurrent > 0) {
                counterCurrent--

                showJoke(counterCurrent)
                updateIndicatorJoke() 
            }

            return 
        }

        if (e.target.closest('.next')) {
            
            if (arrJoke[counterCurrent + 1]) {
                counterCurrent++

                showJoke(counterCurrent)
                updateIndicatorJoke()

                return
            }

            else {
                counterCurrent++

                fetchJoke()
                    .then(() => {
                        showJoke(counterCurrent)
                        updateIndicatorJoke()
                    })
                    .catch(error => console.error('Ошибка', error))

                return 
            }
        }
    })


  
    // Функция для индикатора шутки
    function updateIndicatorJoke() {
        jokeIndicator.innerHTML = `
        Шутка ${counterCurrent + 1} из ${arrJoke.length}
        `
    }
    

})