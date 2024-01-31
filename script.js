const searchField = document.getElementById('search-field');
const resultBox = document.getElementById('result-box');

let timeOut = null;

const debounce = (callback, delay) => {
    let timeOut = null;

    return (...args) => {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            callback(...args);
        }, delay);
    }
}

const handleSearchChange = (e) => {
    const searchTerm = e.target.value.trim() || '';
    console.log('searchTerm ' + searchTerm);

    if (searchTerm === '') {
        resultBox.innerHTML = '';
        resultBox.style.display = 'none';
        return;
    }

    fetch(
        'https://dummyjson.com/users/search?' +
        new URLSearchParams({
            q: searchTerm,
        })
    )
        .then((res) => res.json())
        .then((res) => {
            document.getElementById('result-box').innerHTML = '';
            if (res?.users?.length) {
                res.users.forEach((user) => {
                    const textElm = document.createElement('p');
                    const userName = document.createTextNode(`${user.firstName} ${user.lastName}`);

                    textElm.appendChild(userName);
                    document.getElementById('result-box').appendChild(textElm);
                });
                resultBox.style.display = 'block';
            } else {
                resultBox.style.display = 'none';
            }
        })
        .catch((err) => {
            console.error("Error: " + err);
        });
}


document.getElementById('search-field')
    .addEventListener('input', debounce(handleSearchChange, 1000));