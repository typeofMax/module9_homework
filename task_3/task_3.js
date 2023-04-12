function useRequest(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log('Статус ответа: ', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);

            if (callback) {
                callback(result);
            }
        }

    };


    xhr.onerror = function () {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };

    xhr.send();
};

const resultNode = document.querySelector('.images');
const btnNode = document.querySelector('.submit-btn');
const userNumberInput = document.querySelector('.value');

function displayResult(apiData) {
    let cards = '';

    if (Number(userNumberInput.value) > 10 || Number(userNumberInput.value) < 1) {
        alert('Число вне диапазона от 1 до 10');
    } else {
        apiData.forEach(item => {
            const cardBlock = `
			  <div class="card" >
				<img
				  src="${item.download_url}"
				  class="card-image"
                  width='200px' height='200px'
                  alt="some image from the internet"
				/>
				<p>${item.author}</p>
			  </div>
			`;
            cards = cards + cardBlock;
        });
        resultNode.innerHTML = cards;
    }
    userNumberInput.value = '';
}

btnNode.addEventListener('click', () => {
    useRequest(`https://picsum.photos/v2/list/?limit=${userNumberInput.value}`, displayResult);
});


