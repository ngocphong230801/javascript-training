const url = 'http://localhost:3000/users';
const addModalForm = document.querySelector('.form-user')
const editModalForm = document.querySelector('#editModal .form-user')
let id = '';
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
    //edit
    const btnEdit = document.querySelector(`[data-id = '${user.id}'] .btn-edit`)
    btnEdit.addEventListener('click', (e) => {
        id = user.id;
        e.preventDefault();
        $("#editModal").modal('show');
        editModalForm.fullname.value = user.fullname;
        editModalForm.phone.value = user.phone;
        editModalForm.email.value = user.email;
        editModalForm.age.value = user.age;
        editModalForm.gender.value = user.gender;
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

editModalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(`${url}/${id}`,{
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            fullname : editModalForm.fullname.value,
            phone : editModalForm.phone.value,
            email : editModalForm.email.value,
            age : editModalForm.age.value,
            gender : editModalForm.gender.value
        })
    })
    .then(res => res.JSON)
    .then(() => location.reload())
    editModalForm.fullname.value = '';
    editModalForm.phone.value = '';
    editModalForm.email.value = '';
    editModalForm.age.value = '';
    editModalForm.gender.value = '';
})
