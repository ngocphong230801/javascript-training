const url = 'http://localhost:3000/users';
const addModalForm = document.querySelector('.form-user')

fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(user => {
            renderUser(user)
        });
    });

const tableUser = document.querySelector('#table-user')
const renderUser = (user) => {
    const output = `<tr data-id = '${user.id}'>
                        <td>${user.fullname}</td>
                        <td>${user.phone}</td>
                        <td>${user.email}</td>
                        <td>${user.age}</td>
                        <td> <span>${user.gender}</span> </td>
                        <td><a class="btn-edit btn-primary btn-sm">Edit</a>
                            <a class="btn-del btn btn-danger btn-sm">Del</a>
                        </td>
                    </tr>`;
    tableUser.insertAdjacentHTML('beforeend',output);

    const btnDel = document.querySelector(`[data-id = '${user.id}'] .btn-del`);
    btnDel.addEventListener('click', (e) => {
        console.log('delete'+ ' ' + user.fullname)
        fetch(`${url}/${user.id}`,{
            method : 'DELETE'
        })
        .then(res => res.json())
        .then(() => location.reload())
    })
}

addModalForm.addEventListener('submit',(e) => {
    e.preventDefault();
    fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            fullname : addModalForm.fullname.value,
            phone : addModalForm.phone.value,
            email : addModalForm.email.value,
            age : addModalForm.age.value,
            gender : addModalForm.gender.value
        })
    })
    .then(res => res.JSON)
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderUser(dataArr);
        })
})

