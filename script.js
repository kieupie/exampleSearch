const searchField = document.getElementById('search-field');
const resultBox = document.getElementById('result-box');

let timeOut = null;

let timeWait = false;
let lastArgs = null;

const debounce = (callback, delay) => {
    let timeOut = null;

    return (...args) => {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            callback(...args);
        }, delay);
    }
}

const throttle = (callback, delay) => {
    let timeWait = false;
    let lastArgs = null;

    return (...args) => {
        if (timeWait) {
            //Trigger first event handlers
            lastArgs = e;
            return;
        }

        callback(...args);

        timeWait = true;
        setTimeout(() => {
            if (lastArgs === null) {
                timeWait = false;
            } else {
                timeWait = false;
                callback(...lastArgs)
                lastArgs = null;
            }
        }, delay)

    }
}

//Debounce
const handleSearchChange1 = (e) => {
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

//Throttle
const handleSearchChange2 = (e) => {
    if (timeWait) {
        //Trigger first event handlers
        lastArgs = e;
        return;
    }

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

    timeWait = true;

    setTimeout(() => {
        if (lastArgs === null) {
            timeWait = false;
        } else {
            timeWait = false;
            handleSearchChange2(lastArgs)
            lastArgs = null;
        }
    }, 1000)
}


document.getElementById('search-field')
    // .addEventListener('input', debounce(handleSearchChange1, 1000));
    .addEventListener('input', throttle(handleSearchChange1, 1000));
    // .addEventListener('input', handleSearchChange2);
