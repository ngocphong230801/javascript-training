// Constructer

User = function (firstName, lastName, address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;

    this.getName = function() {
        return `${this.firstName} ${this.lastName}`
    }
}

const author = new User('Phong','Nguyen','Hue')
const user = new User('Linh','Huynh','Gia lai')

console.log(author);
console.log(user);

console.log(author.getName());
console.log(user.getName());

