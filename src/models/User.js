class User {
    constructor(data = {}) {
        this.id = null;
        this.password = null;
        this.username = null;
        this.token = null;
        Object.assign(this, data);
    }
}
export default User;